import { Button, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = ({navigation}) => {
    return (<View style={{backgroundColor: "blue"}}>
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

        {/* <View style={{flexDirection:"row"}}>
            <Text>One Rep Bench</Text>
            <View style={styles.space}></View>
        </View> */}

    </View>);
}

// const styles = StyleSheet.create({
//     space: {
//         height: 30,
//         width: 30
//     }
//   });

export default ProfileScreen;