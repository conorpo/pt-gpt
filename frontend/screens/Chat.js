const ChatScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor: 'red'}}>
            <SettingsButton navigation={navigation} />
            <Text>Hopefully this works??</Text>

            {/* This will house the ChatGPT responses + past user queries */}
            <SafeAreaView>

                
                {/* <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                /> */}
            </SafeAreaView>

            {/* Query will go here*/}
        </SafeAreaView>
    )
}

export default ChatScreen;

