import React, { createContext, useState, useContext, useEffect } from 'react';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [profile, setProfile] = useState({}); // Firestore User Profile
    const [messages, setMessages] = useState([]);

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertModalMessage, setAlertModalMessage] = useState('');

    const showAlertModal = (message) => {
        setAlertModalMessage(message);
        setAlertModalVisible(true);
    };

    return (
        <MainContext.Provider value={{
            profile,
            setProfile,
            messages,
            setMessages,
            showAlertModal,
            alertModalVisible,
            setAlertModalVisible,
            alertModalMessage,
        }}>
            {children}
        </MainContext.Provider>
    );
};

export const useMainContext = () => useContext(MainContext);