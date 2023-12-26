import {createContext, useState, useContext, useEffect} from 'react';
import {app} from '../config/firebaseConfig';

const MainContext = createContext();

export const MainProvider = ({children}) => {
    const [profile, setProfile] = useState(null); // Firestore User Profile
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState(null); 

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertModalMessage, setAlertModalMessage] = useState("");

    const showAlertModal = (message) => {
        setAlertModalMessage(message);
        setAlertModalVisible(true);
    };

    return (
        <MainContext.Provider value={{profile, setProfile, messages, setMessages, token, setToken, showAlertModal, alertModalVisible, setAlertModalVisible, alertModalMessage}}>
            {children}
        </MainContext.Provider>
    )
};

export const useMainContext = () => useContext(MainContext);