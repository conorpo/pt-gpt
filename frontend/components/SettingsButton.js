import React from 'react'
const { Pressable, Image, StyleSheet } = require("react-native")

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    buttonImage: {
        width: 30,
        height: 30,
    },
})

const SettingsButton = ({ navigation }) => {
    return (
        <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
            <Image style={styles.buttonImage} source={require('./icons8-settings.svg')} />
        </Pressable>
    )
}

export default SettingsButton;