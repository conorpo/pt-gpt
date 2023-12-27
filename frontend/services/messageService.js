import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const db = getFirestore();
const auth = getAuth();
const functions = getFunctions();
const chat = httpsCallable(functions, 'chat');


export default {
    getMessagesDoc: async (setMessages) => {
        const messagesRef = doc(db, "messages", auth.currentUser.uid);
        const messagesDoc = await getDoc(messagesRef);
        const messages = messagesDoc.data().messages;
        setMessages(messages);
    },
    chat: async (message) => {
        return await chat({message});
    }
}