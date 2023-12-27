const {onCall, HttpsError} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const { logger} = require("firebase-functions/v2");
const {getFirestore, FieldValue, Timestamp} = require("firebase-admin/firestore");
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

function createProfileMessage(profile, name) {
    const safeName = name.replace(/(\r\n|\n|\r)/gm, "");
    const safeProfile = { // remove newlines cause openai api doesn't like them
        ...profile,
        pronouns: profile.pronouns.replace(/(\r\n|\n|\r)/gm, ""),
        sports: profile.sports.replace(/(\r\n|\n|\r)/gm, ""),
        goals: profile.goals.replace(/(\r\n|\n|\r)/gm, "")
    }

    return {
        role: 'system',
        content: 
            `Assigned User Info:` +
            `Name: ${safeName}` +
            `Pronouns: ${safeProfile.pronouns}` +
            `Height: ${safeProfile.height + ((safeProfile.units.localeCompare("Metric") == 0) ? ' cm' : ' in')}` +
            `Weight: ${safeProfile.weight + ((safeProfile.units.localeCompare("Metric") == 0) ? ' kg' : ' lbs')}` +
            `Sports: ${safeProfile.sports}` +
            `Goals (written by User): ${safeProfile.goals}` +
            `Your User has chosen the following personality for you: ${profile.personality}` +
            `Try to embody the personality that your user has chosen, speak mostly objectively and always answer as best you can, but feel free to add some of the personality to the conversation, and embellish some sentences to make them more interesting.` + 
            `Feel free to use the User's name, pronouns, or any other info in responses.` + 
            `Please stay in character, talk like your character and don't say you are an AI (unless that is your assigned personality).`
    }
}

exports.chat = onCall({secrets: [OPENAI_API_KEY]}, async request => {
    try {
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY.value(),
            organization: OPENAI_ORGANIZATION.value()
        })
        if(!openai) throw new HttpsError('unavailable', 'OpenAI is not initialized.');

        const uid = request.auth.uid;
        if(!uid) throw new HttpsError('unauthenticated', 'User is not authenticated.');
        
        const profileDocSnap = await getFirestore().collection('profiles').doc(uid).get();
        if(!profileDocSnap.exists) throw new HttpsError('not-found', 'No profile doc found for this user.');
        const profile = profileDocSnap.data();

        const profile_message = createProfileMessage(profile, request.data.name);
        logger.log(profile_message);

        const messagesDocRef = getFirestore().collection('messages').doc(uid);
        const messagesDocSnap = await messagesDocRef.get();
        if(!messagesDocSnap.exists) throw new HttpsError('not-found', 'No messages doc found for this user.');

        const messages = messagesDocSnap.data().messages.map(message => {
            //OpenAI api doesn't like createdAt
            return {
                role: message.role,
                content: message.content,
            } 
        });

        const new_message_createdAt = Timestamp.now(); // For accurate createdAt in firestore
        const new_message = {
            role: 'user',
            content: request.data.message,
        };

        const completion = await openai.chat.completions.create({
            model: OPENAI_MODEL.value(),
            messages: [
                systemMessage,
                profile_message,
                ...messages,
                new_message
            ],
            max_tokens: OPENAI_MAX_TOKENS.value(),
        });

        new_message.createdAt = new_message_createdAt;

        const choice = completion.choices[0].message;
        const response = {
            role: choice.role,
            content: choice.content,
            createdAt: Timestamp.now()
        }
        
        messagesDocRef.update({
            messages: FieldValue.arrayUnion(new_message, response)
        });

        // Optimistically update the messages before firestore update
        //response.createdAt = new_message_createdAt.toJSON(); // can't send Date object to client, maybe clean this whole createdAt thing up later
        logger.log(response);
        return response;
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
