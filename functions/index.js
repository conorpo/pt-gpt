const {onCall, HttpsError} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const { logger} = require("firebase-functions/v2");
const {getFirestore} = require("firebase-admin/firestore");
const {onConfigUpdated} = require("firebase-functions/v2/remoteConfig");
const { defineString, defineSecret, defineInt } = require('firebase-functions/params');
const {initializeApp} = require("firebase-admin/app");

const {OpenAI} = require('openai');

initializeApp();

// Env Parameters
const SYSTEM_MESSAGE_STR = defineString('SYSTEM_MESSAGE_STR');

const OPENAI_MAX_TOKENS = defineInt('OPENAI_MAX_TOKENS');
const OPENAI_MODEL = defineString('OPENAI_MODEL');
const OPENAI_ORGANIZATION = defineString('OPENAI_ORGANIZATION');
const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

const systemMessage = {
    role: 'system',
    content: SYSTEM_MESSAGE_STR || "You are bot, listen to human."
};

let openai = null;

exports.chat = onCall(async request => {
    try {
        if(!openai) throw new HttpsError('unavailable', 'OpenAI is not initialized.');

        const uid = request.auth.uid;
        if(!uid) throw new HttpsError('unauthenticated', 'User is not authenticated.');
        
        const profileDocSnap = await getFirestore().collection('profiles').doc(uid).get();
        if(!profileDocSnap.exists) throw new HttpsError('not-found', 'No profile doc found for this user.');

        const profile = profileDocSnap.data();

        const profile_message = {
            role: 'system',
            content: `Assigned User Info:\n\nName: ${profile.name}\nPronouns: ${profile.pronouns}\nHeight: ${profile.height + (profile.units.localeCompare("Metric") ? ' cm' : ' in')}\nWeight: ${profile.weight + (profile.units.localeCompare("Metric") ? ' kg' : ' lbs')}\nSports: ${profile.sports}\nGoals (written by User): ${profile.goals}\n\nYour User has chosen the following personality for you: ${profile.personality}\nTry to embody the personality that your user has chosen, speak mostly objectively and always answer as best you can, but feel free to add some of the personality to the conversation, and embellish some sentences to make them more interesting. Feel free to use the User's name, pronouns, or any other info in responses. Please stay in character, talk like your character and don't say you are an AI.`
        }

        const messagesDocSnap = await getFirestore().collection('messages').doc(uid).get();
        if(!messagesDocSnap.exists) throw new HttpsError('not-found', 'No messages doc found for this user.');

        const messages = messagesDocSnap.data().messages;

        const new_message = {
            role: 'user',
            content: request.body.message
        };

        const completion = await openai.createChatCompletion({
            model: OPENAI_MODEL.value(),
            messages: [
                systemMessage,
                profile_message,
                ...messages.map(message => ({content: message.content, role: message.role})),
                new_message
            ],
            max_tokens: OPENAI_MAX_TOKENS.value(),
        });

        const response = completion.data.choices[0].message;

        getFirestore().collection('messages').doc(uid).update({
            messages: [
                ...messages,
                {
                    ...new_message,
                    createdAt: new Date()
                },
                {
                    ...response,
                    createdAt: new Date()
                }
            ]
        });

        // Optimistically update the messages
        logger.log(response);
        return {
            text: response.content,
            createdAt: response.createdAt,
        };
    } catch (error) {
        logger.error(error);
        if (error instanceof HttpsError) {
            throw error;
        } else {
            logger.error(error);
            throw new HttpsError('unknown', 'An unknown error occurred.');
        }
    }
});

exports.setupNewUser = functions.auth.user().onCreate(async (user) => {
    await getFirestore().collection('profiles').doc(user.uid).set({personality: 'AI', units: 'Metric'});
    await getFirestore().collection('messages').doc(user.uid).set({messages: []});
});

exports.onConfigUpdated = onConfigUpdated({secrets: [OPENAI_API_KEY]},(snapshot) => {
    openai = new OpenAI({
        apiKey: OPENAI_API_KEY.value(),
        organization: OPENAI_ORGANIZATION.value()
    });
});

