import React, {useState, useCallback, useEffect, useContext} from 'react';
import { SafeAreaView, Text, TextInput, View, ScrollView, StyleSheet} from 'react-native';
import SettingsButton from '../components/SettingsButton.js';
import { GiftedChat } from 'react-native-gifted-chat';
import { UserContext } from '../contexts/User.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator"


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    view: {
        flex: 1,
    }
  });


const ChatScreen = ({navigation}) => {
    console.log("In Chat");
    const {user, messages, setMessages, URI} = useContext(UserContext);
    const [isTyping, setIsTyping] = useState(false);

    const onSend = useCallback(async (msgs = []) => {      
        setMessages(previousMessages => GiftedChat.append(previousMessages, msgs))
        try {
            setIsTyping(true);  
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`${URI}/api/protected/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({msg: msgs[0].text})
            })
            const {text, createdAt} = await response.json();

            setIsTyping(false);
            setMessages(previousMessages => {
                return GiftedChat.append(previousMessages, [{
                    _id: previousMessages.length,
                    text,
                    createdAt,
                    user: {
                        _id: 2,
                        name: user.personality,
                        avatar: `${URI}/imgs/personalities/${user.personality}.png`
                    }
                }]);
            });
        } catch (err) {
            console.log(err);
        }
        
    }, [])

    return (
        <View style={styles.view}>
            <SettingsButton navigation={navigation} />
          

            {/* This will house the ChatGPT responses + past user queries */}
            <GiftedChat
                inverted={true}
                isTyping={isTyping}
                shouldUpdateMessage={() => true}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    name: user.name,
                }}
            />            
        </View>
    );
    
}

export default ChatScreen;

