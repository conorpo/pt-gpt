import React, { useContext, useEffect, useRef } from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, Alert, Pressable } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { useTheme } from '@react-navigation/native';
import { v4 as messageIdGenerator } from 'uuid';
import { MainContext } from '../contexts/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../components/AlertModal';


const LoginScreen = ({ navigation }) => {
    const { user, setUser, setMessages, config, helpers, setToken } = useContext(MainContext);
    const [email, onChangeEmai] = React.useState('');
    const [name, onChangeName] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const [alertVisible, setAlertVisisble] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const errorRef = useRef(null);
    const {colors} = useTheme();

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 5,
            marginHorizontal: 12,
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 20,
            padding: 10,
            color: colors.text
        },
        button: {
            height: 40,
            width: 80,
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 10,
            textAlign: "center",
            color: colors.primary
        },
        buttonText: {
            color: "#000000"
        },
        space: {
            height: 30,
            width: 10
        },
        error: {
            color: "red",
            padding: 10
        },
        welcome: {
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            color: colors.primary,
            marginTop: 30
        }
    });
    
    async function login() {
        try {
            const response = await fetch(`${config.URI}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            
            if (response.status != 200) {
                setAlertMessage(result.message);
                setAlertVisisble(true);
                return;
            }

            setUser(result.user);
            setMessages(result.messages.reverse().map(helpers.convertMessage, result.user));
            setToken(result.token);
            await AsyncStorage.setItem('token', result.token);

            navigation.navigate('Chat');
        } catch (err) {
            console.log(err);
        }

    }

    async function register() {
        //Validate Fields
        if (email == "" || password == "" || name == "") {
            setAlertMessage("Please fill out all fields!");
            setAlertVisisble(true);
            return;
        }

        try {
            const response = await fetch(`${config.URI}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            });

            const result = await response.json();

            if (response.status != 200) {
                setAlertMessage(result.message);
                setAlertVisisble(true);
                return;
            }

            setUser(result.user);
            setAlertMessage("Success!, Please Check Your Email to Verify!");
            setAlertVisisble(true);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {}, []);


    return (
        // Everything in one View - Can only return one thing
        <View>
            <Text style={styles.welcome}>Welcome to PT-GPT!</Text>
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
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Name (Only Needed for Register)"
                keyboardType="default"
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable
                    onPress={login}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <View style={styles.space}></View>
                <Pressable
                    onPress={register}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>      
            </View>
            <AlertModal
                visible={alertVisible}
                setVisible={setAlertVisisble}
                message={alertMessage}
            ></AlertModal>
        </View>
    );
}


export default LoginScreen;