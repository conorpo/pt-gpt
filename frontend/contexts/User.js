import {createContext, useState} from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const URI = 'http://localhost:3000';
    
    return (
        <UserContext.Provider value={{user, setUser, messages, setMessages, URI}}>
            {children}
        </UserContext.Provider>
    )
};

export {UserContext, UserProvider};