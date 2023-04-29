import React, { useContext } from "react";
import { Button, View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../components/AlertModal';

import { MainContext } from '../contexts/Main';

const styles = StyleSheet.create({
    space: {
        height: 30,
        width: 30
    },
    input: {
        flexDirection: "row",
        border: '1px solid'
    }
});



const ProfileScreen = ({ navigation }) => {
    const { user, setUser, setMessages, config, helpers, token} = useContext(MainContext);
    const [name, onChangeName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [alertVisible, setAlertVisisble] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    async function edit() {

        try {
            var components;
            if(name == "" && password == ""){
                console.log(1);
                return; 
            } else if (name == ""){
                console.log(2);
                components = {password};
            } else if(password == ""){
                console.log(3);
                components = {name};
            } else {
                console.log(4);
                components = {name, password};
            }

            const response = await fetch(`${config.URI}/api/protected/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(components)
            });

            const result = await response.json();
            
            if (response.status != 200) {
                setAlertMessage(result.message);
                setAlertVisisble(true);
                return;
            }
            setAlertMessage("Success!");
            setAlertVisisble(true);
            
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <View >
            <Button
                title="Back to Chat"
                onPress={() => navigation.goBack()}
            />

            <Button
                title="Logout"
                onPress={() => {
                    AsyncStorage.removeItem('token');
                    navigation.navigate('Login');
                }}
            />
            <View style={styles.input}>
                <Text>Name</Text>
                <View style={styles.space}></View>
                <TextInput
                    placeholder="John"
                    onChangeText={onChangeName}
                    value={name}
                />
            </View>
            <View style={styles.input}>

                <Text>Password</Text>
                <View style={styles.space}></View>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={onChangePassword}
                    value={password}
                />
            </View>
            <Pressable
                onPress={edit}
            >
                <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <AlertModal
                visible={alertVisible}
                setVisible={setAlertVisisble}
                message={alertMessage}
            ></AlertModal>
        </View>
    );
}

export default ProfileScreen;