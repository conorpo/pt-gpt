// Handles the authentication of the user
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail, updateProfile, updateEmail, verifyBeforeUpdateEmail} from "firebase/auth";
import { useMainContext } from "../contexts/Main";
import { validateEmail, validatePassword, validateName } from "../utils/validators";
import { profile } from "winston";

const auth = getAuth();
const { setAuthUser } = useMainContext(); // setProfile and setMessages are only needed for logout

export default {
    login: async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setAuthUser(user);
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

        setAuthUser(user);
    },
    signOut: async () => {
        await signOut(auth);
        setAuthUser(null);
    },
    updateProfile: async (profile) => {
        await updateProfile(auth.currentUser, profile);
    },
    updateEmail: async (email) => {
        await verifyBeforeUpdateEmail(auth.currentUser, email);
    }
};
