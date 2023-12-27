import React, {useState, useCallback, useEffect, useContext} from 'react';
import { SafeAreaView, Text, TextInput, View, ScrollView, StyleSheet} from 'react-native';
import SettingsButton from '../components/SettingsButton.js';
import {v4 as messageIdGenerator} from 'uuid';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useMainContext } from '../contexts/Main.js';
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator"
import { useTheme } from '@react-navigation/native';
import messageService from '../services/messageService.js';
import authService from '../services/authService.js';
import { getAuth } from 'firebase/auth';

/*
    TODO: setup firebase function for chat
*/

const ChatScreen = ({navigation}) => {
    const { profile, messages, setMessages } = useMainContext();
    const [isTyping, setIsTyping] = useState(false);

    const colors = useTheme().colors;

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

    const onSend = useCallback(async (msgs = []) => {      
        setMessages(previousMessages => GiftedChat.append(previousMessages, msgs))
        try {
            setIsTyping(true);  
            const {text, createdAt} = await messageService.chat(msgs[0].text);
            setIsTyping(false);

            setMessages(previousMessages => {
                return GiftedChat.append(previousMessages, [{
                    _id: messageIdGenerator(),
                    text,
                    createdAt,
                    user: {
                        _id: 2,
                        name: profile.personality,
                        avatar: `${config.URI}/imgs/personalities/${profile.personality}.png`
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
                onSend={msgs => onSend(msgs)}
                user={{
                    _id: "user",
                    name: getAuth().currentUser.displayName,
                }}
                renderBubble={props => {
                    return (
                      <Bubble
                        {...props}
                        textStyle={{
                            left: {
                                color: colors.background
                            },
                            right: {
                                color: colors.background
                            }
                        }}
                        wrapperStyle={{
                            left: {
                                backgroundColor: colors.primary
                            },
                            right: {
                                backgroundColor: colors.text
                            }
                        }}
                        timeTextStyle={{
                            left: {
                                color: colors.background
                            },
                            right: {
                                color: colors.background
                            }
                        }}
                      />
                    );
                  }}
            />            
        </View>
    );
    
}

export default ChatScreen;

