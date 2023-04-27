import { StyleSheet, Button, View, Text, TextInput } from "react-native";


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
    console.log("In profile");
    console.log("huh");
    return (
        <View>
            <Button
                title="Back to Chat"
                onPress={() => navigation.goBack()}
            />

            <View style={styles.input}>
                <Text>One Rep Bench</Text>
                <View style={styles.space}></View>
                <TextInput 
                    placeholder="e.g. 135 lbs"
                />
            </View>
            <View style={styles.input}>
                <Text>Name</Text>
                <View style={styles.space}></View>
                <TextInput 
                    placeholder="e.g. 135 lbs"
                />
            </View>
            <View style={styles.input}>
                <Text>Pronouns</Text>
                <View style={styles.space}></View>
                <TextInput 
                    placeholder="he/she"
                />
            </View>
            <View style={styles.input}>
                <Text>Email</Text>
                <View style={styles.space}></View>
                <TextInput 
                    placeholder="johndoe@example.com"
                />
            </View>

        </View>
    );
}



export default ProfileScreen;