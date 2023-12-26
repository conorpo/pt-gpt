import React, { useEffect } from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, Alert, Pressable } from 'react-native'
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../components/AlertModal';

import { useMainContext } from '../contexts/Main';

import authService from '../services/authService'; 
import profileService from '../services/profileService';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState('');
    const [name, onChangeName] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const { showAlertModal } = useMainContext();

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

    const loginListener = onAuthStateChanged(getAuth(), async (user) => {
        try {
            await profileService.getProfileDoc();
            await messageService.getMessagesDoc();
            navigation.navigate('Chat');
        } catch (err) {
            console.log(err);
            showAlertModal(err.message);
        }
    });

    async function loginHandler() {
        try {
            await authService.login(email, password);
        } catch (err) {
            console.log(err);
            showAlertModal(err.message);
        }
    }

    async function registerHandler() {
        try {
            loginListener(); // Remove the listener so that it doesn't fire when we register
            await authService.register(email, password, name); //Fields are validated in authService
            await profileService.setProfileDoc();
            await messageService.setMessagesDoc();
           
            showAlertModal("Please check your email for a verification link!");
        } catch (err) {
            console.log(err);
            showAlertModal(err.message);
        }
    }

    return (
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
            <AlertModal></AlertModal>
        </View>
    );
}


export default LoginScreen;