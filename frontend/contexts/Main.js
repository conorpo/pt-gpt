import {createContext, useEffect, useState} from 'react';
import {v4 as messageIdGenerator} from 'uuid';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm6LpGIvC6SKd6lGtzAjgLxLjeov1doDQ",
  authDomain: "pt-gpt.firebaseapp.com",
  projectId: "pt-gpt",
  storageBucket: "pt-gpt.appspot.com",
  messagingSenderId: "160696689322",
  appId: "1:160696689322:web:ef178a5c05057bc7dc26d3",
  measurementId: "G-LR20VKVT4L"
};

const MainContext = createContext();

const MainProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState(null);

    const config = {
        URI : (__DEV__ == true) ? 'http://localhost:3000' : 'https://pt-gpt.com',
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const helpers = {
        messageIdGenerator,
        convertMessage: function(message) {
            console.log(this);
            return {
                _id: messageIdGenerator(),
                text: message.content,
                createdAt: message.createdAt,
                user: {
                    _id: message.role,
                    name: (message.role == 'user') ? this.name : this.personality,
                    avatar: `${config.URI}/imgs/personalities/${this.personality}.png`
                }
            };
        }
    } 
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);


    return (
        <MainContext.Provider value={{token, setToken, user, setUser, messages, setMessages, config, helpers, auth, app}}>
            {children}
        </MainContext.Provider>
    )
};

export {MainContext, MainProvider};