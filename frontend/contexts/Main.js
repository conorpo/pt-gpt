import {createContext, useState, useContext, useEffect} from 'react';
import {app} from '../config/firebaseConfig';

const MainContext = createContext();

export const MainProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null); // Firebase Auth User
    const [profile, setProfile] = useState(null); // Firestore User Profile
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState(null); 

    useEffect(() => {
        if(!authUser) {
            setProfile(null);
            setMessages([]);
        }
    }, [authUser]);

    return (
        <MainContext.Provider value={{authUser, setAuthUser, profile, setProfile, messages, setMessages, token, setToken}}>
            {children}
        </MainContext.Provider>
    )
};

export const useMainContext = () => useContext(MainContext);