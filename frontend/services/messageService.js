import { getFirestore, doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { getFunctions, httpsCallable } from "firebase/functions";

import {assets} from '../config/assetConfig';


const db = getFirestore();
const auth = getAuth();
const functions = getFunctions();
const chat = httpsCallable(functions, 'chat');

const convertMessageToGiftedChatMessage = (message, personality) => {
    return {
        _id: uuidv4(),
        text: message.content,
        createdAt: message.createdAt.toDate(), // Firestore timestamp to JS Date
        user: {
            _id: message.role,
            name: (message.role === 'user') ? auth.currentUser.displayName : personality,
            avatar: (message.role === 'user') ? undefined : assets.personality_avatars[personality].localUri
        }
    }
};

export default {
    getMessagesDoc: async (setMessages, profile) => {
        const messagesRef = doc(db, "messages", auth.currentUser.uid);
        const messagesDoc = await getDoc(messagesRef);
        if(!messagesDoc.exists()) return; // Messages doc might not exist yet, this is handled by a cloud function
        const messages = messagesDoc.data().messages;

        // Converts the messages to the format used by GiftedChat
        const giftedChatMessages = messages.reverse().map(msg => convertMessageToGiftedChatMessage(msg, profile.personality));
        setMessages(giftedChatMessages);
    },
    chat: async (message, profile) => {
        const response =  await chat({message, name: auth.currentUser.displayName});
        response.data.createdAt = new Timestamp(response.data.createdAt._seconds, response.data.createdAt._nanoseconds);
        return convertMessageToGiftedChatMessage(response.data, profile.personality);
    }
}