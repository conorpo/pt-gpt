import { Button, View } from "react-native";

const ProfileScreen = ({navigator}) => {
    <View style={{backgroundColor: "blue"}}>
        <Button
            title="Back to Chat"
            onPress={() => navigator.goBack()}
        />

        <View style={{flexDirection:"row"}}>
            <Text>One Rep Bench</Text>
            <View style={styles.space}></View>
            {/* <TextInput/> */}
        </View>

    </View>
}

// const styles = StyleSheet.create({
//     space: {
//         height: 30,
//         width: 30
//     }
//   });

export default ProfileScreen;