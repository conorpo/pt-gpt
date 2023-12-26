import React, {useState, useCallback, useEffect, useContext} from 'react';
import { SafeAreaView, Text, TextInput, View, ScrollView, StyleSheet} from 'react-native';
import SettingsButton from '../components/SettingsButton.js';
import {v4 as messageIdGenerator} from 'uuid';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { MainContext } from '../contexts/Main.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator"
import { useTheme } from '@react-navigation/native';





const ChatScreen = ({navigation}) => {
    const {} = useContext(MainContext);
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
            const response = await fetch(`${config.URI}/api/protected/chat`, {
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
                    _id: messageIdGenerator(),
                    text,
                    createdAt,
                    user: {
                        _id: 2,
                        name: user.personality,
                        avatar: `${config.URI}/imgs/personalities/${user.personality}.png`
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
                    _id: "user",
                    name: user.name,
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

