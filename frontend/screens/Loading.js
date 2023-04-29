import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { v4 as messageIdGenerator } from 'uuid';
import { MainContext } from '../contexts/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({ navigation, convertMessage}) => {
    const { user, setUser, setMessages, config, helpers, setToken} = useContext(MainContext);

    useEffect(() => {
        async function getToken() {
            try {
                const JWT = await AsyncStorage.getItem('token');

                if(!JWT) throw('No token found');

                // Get User Info if you have a token
                setToken(JWT);

                const response = await fetch(`${config.URI}/api/protected/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JWT}`
                    }
                });
                
                const result = await response.json();
                if(String(response.status.toString()).startsWith('4')) throw('Invalid token')


                setUser(result.user);
                setMessages(result.messages.reverse().map(helpers.convertMessage, result.user)); 
                navigation.navigate('Chat');
            } catch (err) {
                console.log(err)
                await AsyncStorage.removeItem('token');
                console.log("Removed token.")

                navigation.navigate('Login');
            }
        }
        getToken();
    }, []);

    return (
        <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color="#ffc904" />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingWrapper: {
        borderRadius: 10,
        padding: 20,
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default LoadingScreen;