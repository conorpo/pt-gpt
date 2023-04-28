import React, { useContext, useEffect, useRef } from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, Pressable } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { v4 as messageIdGenerator } from 'uuid';
import { UserContext } from '../contexts/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const { user, setUser, setMessages, URI } = useContext(UserContext);
    const [email, onChangeEmai] = React.useState('');
    const [name, onChangeName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const errorRef = useRef(null);

    function convertMessage(message, index) {
        return {
            _id: messageIdGenerator(),
            text: message.content,
            createdAt: message.createdAt,
            user: {
                _id: (message.role == 'user') ? 1 : 2,
                name: (message.role == 'user') ? this.name : this.personality,
                avatar: `${URI}/imgs/personalities/${this.personality}.png`
            }
        }
    }

    async function login() {
        try {
            const response = await fetch(`${URI}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            console.log(result);
            console.log("Status: " + result.status);

            if (result.status != 200) {
                console.log("Message: " + result.message);
                errorRef.current.innerHTML = result.message;
                return;
            }
                setUser(result.user);
                setMessages(result.messages.reverse().map(convertMessage, result.user));
                await AsyncStorage.setItem('token', result.token);

                navigation.navigate('Chat');
        } catch (err) {
            console.log(err);
        }

    }

    async function register() {
        try {
            const response = await fetch(`${URI}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            });

            const result = await response.json();

            if (result.status != 200) {
                console.log("Message: " + result.message);
                errorRef.current.innerHTML = result.message;
                return;
            }

            setUser(result.user);

            alert("Verify Your Email to Login!");

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function getToken() {
            const JWT = await AsyncStorage.getItem('token');
            if (JWT) {
                try {
                    const response = await fetch(`${URI}/api/protected/user`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JWT}`
                        }
                    });

                    const result = await response.json();

                    setUser(result.user);
                    setMessages(result.messages.reverse().map(convertMessage, result.user));

                    navigation.navigate('Chat');
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getToken();
    }, []);


    return (
        // Everything in one View - Can only return one thing
        <View>
            <Text
                ref={errorRef}
                style={styles.error}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmai}
                value={email}
                placeholder="Email"
                keyboardType="default"
            />
            <TextInput secureTextEntry={true}
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Name (Only Needed for Register)"
                keyboardType="default"
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button
                    title="Login"
                    onPress={login}
                    color="#7A918D"
                />
                <View style={styles.space}></View>
                <Button
                    title="Register"
                    onPress={register}
                    color="#7A918D"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        height: 40,
        width: 20,
        color: "#A18276"
    },
    space: {
        height: 30,
        width: 30
    },
    error: {
        color: "red",
        padding: 10
    }
});

export default LoginScreen;