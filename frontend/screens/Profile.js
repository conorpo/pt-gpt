import { Button, View } from "react-native";

const ProfileScreen = ({navigator}) => {
    <View style={{backgroundColor: "blue"}}>
        <Button
            title="Back to Chat"
            onPress={() => navigator.goBack()}
        />
    </View>
}

export default ProfileScreen;