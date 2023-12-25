import React from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, Alert, Pressable } from 'react-native'
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../components/AlertModal';

import { useMainContext } from '../contexts/Main';

import authService from '../services/authService'; 
import profileService from '../services/profileService';

const LoginScreen = ({ navigation }) => {
    const { setUser, setMessages, setToken } = useMainContext();

    const [email, onChangeEmail] = React.useState('');
    const [name, onChangeName] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    //TODO: Put this onto the AlertModal somehow
    const [alertVisible, setAlertVisisble] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

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
        welcome: {
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            color: colors.primary,
            marginTop: 30
        }
    });

    async function loginHandler() {
        try {
            await authService.login(email, password);
            await profileService.getProfileDoc();
            //await messageService.getMessages();

            navigation.navigate('Chat');
        } catch (err) {
            console.log(err);
            setAlertMessage(err.message);
            setAlertVisisble(true);
        }
    }

    async function registerHandler() {
        try {
            await authService.register(email, password, name); //Fields are validated in authService
            await profileService.setProfileDoc();
            //await messageService.getMessages();
            
            setAlertMessage("Success!, Please Check Your Email to Verify!");
            setAlertVisisble(true);
        } catch (err) {
            console.log(err);
            setAlertMessage(err.message);
            setAlertVisisble(true);
        }
    }

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
                onChangeText={onChangeEmail}
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
                    onPress={loginHandler}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <View style={styles.space}></View>
                <Pressable
                    onPress={registerHandler}
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