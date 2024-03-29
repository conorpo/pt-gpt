import React, {useState, useCallback, useEffect, useContext} from 'react';
import { SafeAreaView, Text, TextInput, View, ScrollView, StyleSheet} from 'react-native';
import SettingsButton from '../components/SettingsButton.js';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useMainContext } from '../contexts/Main.js';
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator"
import { useFocusEffect, useTheme } from '@react-navigation/native';
import messageService from '../services/messageService.js';
import { getAuth } from 'firebase/auth';
import AlertModal from '../components/AlertModal';

const ChatScreen = ({navigation}) => {
    const {profile, messages, setMessages, showAlertModal} = useMainContext();
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

    useEffect(() => {
        (async function getMessages() {
            try {
                await messageService.getMessagesDoc(setMessages, profile);
            } catch (err) {
                console.log(err);
                showAlertModal("Error", "Failed to load messages");
            }
        })();
    }, []);

    const onSend = useCallback(async (sentMessages = []) => {      
        try {
            //Tell me this shits not beautiful
            setMessages(previousMessages => GiftedChat.append(previousMessages, sentMessages))
            setIsTyping(true);  
            const responseMessage = await messageService.chat(sentMessages[0].text, profile);
            setIsTyping(false);
            setMessages(previousMessages => GiftedChat.append(previousMessages, responseMessage));
        } catch (err) {
            console.log(err);
            showAlertModal("Error", "Failed to send message");
        }
        
    }, [profile])

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
            <AlertModal></AlertModal>            
        </View>
    );
    
}

export default ChatScreen;

