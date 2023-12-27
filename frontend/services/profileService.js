import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export default {
    setProfileDoc: async (profile, setProfile, new_data) => {
        const profileRef = doc(db, "profiles", auth.currentUser.uid);
        await setDoc(profileRef, new_data); //Update profile in firestore

        setProfile(
            {
                ...profile,
                ...new_data
            }
        )
    },
    getProfileDoc: async (setProfile) => {
        const profileRef = doc(db, "profiles", auth.currentUser.uid);
        const profileDoc = await getDoc(profileRef);

        if (profileDoc.exists()) {
            setProfile(profileDoc.data());
        }
    }
};