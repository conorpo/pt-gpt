const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");
const {getFirestore} = require("firebase-admin/firestore");

const openai = require('../config/openai_connection');

const SYSTEM_MESSAGE = {
    role: 'system',
    content: process.env.SYSTEM_MESSAGE || "You are bot, listen to human."
};

exports.chat = onCall(async request => {
    try {
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
            content: request.body.msg
        };

        const completion = await openai.createChatCompletion({
            model: process.env.OPENAI_MODEL,
            messages: [
                SYSTEM_MESSAGE,
                profile_message,
                ...messages.map(message => ({content: message.content, role: message.role})),
                new_message
            ],
            max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS),
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
        return {
            text: response.content,
            createdAt: response.createdAt,
        };
    } catch (error) {
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