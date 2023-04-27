import {createContext, useState} from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const URI = (__DEV__ == true) ? 'http://localhost:3000' : 'https://pt-gpt.com';
    
    return (
        <UserContext.Provider value={{user, setUser, messages, setMessages, URI}}>
            {children}
        </UserContext.Provider>
    )
};

export {UserContext, UserProvider};