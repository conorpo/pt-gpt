import { getFirestore, doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { getFunctions, httpsCallable } from "firebase/functions";
import { config } from "../config/config.js";

const db = getFirestore();
const auth = getAuth();
const functions = getFunctions();
const chat = httpsCallable(functions, 'chat');

let personality = null;

const convertMessageToGiftedChatMessage = (message, profile) => {
    return {
        _id: uuidv4(),
        text: message.content,
        createdAt: message.createdAt.toDate(), // Firestore timestamp to JS Date
        user: {
            _id: message.role,
            name: personality,
            avatar: `${config.URI}/imgs/personalities/${personality.replace(' ','')}.png`
        }
    }
};

export default {
    getMessagesDoc: async (setMessages, profile) => {
        personality = profile.personality;

        const messagesRef = doc(db, "messages", auth.currentUser.uid);
        const messagesDoc = await getDoc(messagesRef);
        const messages = messagesDoc.data().messages;

        // Converts the messages to the format used by GiftedChat
        const giftedChatMessages = messages.reverse().map(convertMessageToGiftedChatMessage);
        console.log(giftedChatMessages);
        setMessages(giftedChatMessages);
    },
    chat: async (message, profile) => {
        personality = profile.personality;

        const response =  await chat({message, name: auth.currentUser.displayName});
        response.data.createdAt = new Timestamp(response.data.createdAt._seconds, response.data.createdAt._nanoseconds);
        return convertMessageToGiftedChatMessage(response.data);
    }
}