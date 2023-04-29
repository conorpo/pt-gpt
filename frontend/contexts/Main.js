import {createContext, useEffect, useState} from 'react';
import {v4 as messageIdGenerator} from 'uuid';

const MainContext = createContext();

const MainProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState(null);

    const config = {
        URI : (__DEV__ == true) ? 'http://localhost:3000' : 'https://pt-gpt.com',
    }

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
    return (
        <MainContext.Provider value={{token, setToken, user, setUser, messages, setMessages, config, helpers}}>
            {children}
        </MainContext.Provider>
    )
};

export {MainContext, MainProvider};