import React, { useContext, useEffect, useRef } from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, Alert, Pressable } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { useTheme } from '@react-navigation/native';
import { v4 as messageIdGenerator } from 'uuid';
import { MainContext } from '../contexts/Main';
import AlertModal from '../components/AlertModal';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const ErrorMessages = {
    "auth/invalid-email": "Invalid email address",
    "auth/user-disabled": "User disabled",
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Wrong password",
    "auth/email-already-in-use": "Email already in use",
};


const LoginScreen = ({ navigation }) => {
    const { user, setUser, setMessages, config, helpers, setToken, auth } = useContext(MainContext);
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
            await signInWithEmailAndPassword(auth, email, password);
            if (response.status != 200) {
                setAlertMessage(result.message);
                setAlertVisisble(true);
                return;
            }

            setUser(result.user);
            setMessages(result.messages.reverse().map(helpers.convertMessage, result.user));
            setToken(result.token);

            navigation.navigate('Chat');
        } catch (err) {
            setAlertMessage(ErrorMessages[err.code] || err.message || "Unknown Error");
            setAlertVisisble(true);
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
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, {
                displayName: name
            });

            setUser(auth.currentUser);
            setAlertMessage("Success!, Please Check Your Email to Verify!");
            setAlertVisisble(true);
        } catch (err) {
            console.log(err);
            setAlertMessage(ErrorMessages[err.code] || err.message || "Unknown Error");
            setAlertVisisble(true);
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