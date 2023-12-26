// Handles the authentication of the user
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail, updateProfile, updateEmail, verifyBeforeUpdateEmail, onAuthStateChanged} from "firebase/auth";
import { useMainContext } from "../contexts/Main";
import { validateEmail, validatePassword, validateName } from "../utils/validators";
import profileService from "./profileService";

const auth = getAuth();

export default {
    login: async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    },
    register: async (email, password, name) => {
        if (!validateEmail(email)) throw new Error("Invalid Email!");
        if (!validatePassword(password)) throw new Error("Password must be at least 8 characters!");
        if (!validateName(name)) throw new Error("Please enter a name!");

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: name
        });
        await sendEmailVerification(user);
    },
    signOut: async () => {
        await signOut(auth);
    },
    updateProfile: async (profile) => {
        await updateProfile(auth.currentUser, profile);
    },
    updateEmail: async (email) => {
        await verifyBeforeUpdateEmail(auth.currentUser, email);
    },

};
