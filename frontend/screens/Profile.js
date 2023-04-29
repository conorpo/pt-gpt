import React, { useContext } from "react";
import { Button, View, StyleSheet, TextInput, Text, Pressable, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../components/AlertModal';
import SelectDropdown from 'react-native-select-dropdown'

import { MainContext } from '../contexts/Main';
import { useTheme } from '@react-navigation/native';

import BackButton from '../components/BackButton';

const unitOptions = ["Metric", "Imperial"];
const personalityOptions = ["AI", "Cthulhu", "Dracula", "Hercules", "Mickey Mouse", "Popeye", "Robin Hood", "Sherlock", "Tarzan", "Thor", "Zorro"];



const ProfileScreen = ({ navigation }) => {
    const { user, setUser, setMessages, config, helpers, token, setToken} = useContext(MainContext);
    
    const [info, setInfo] = React.useState({
        name: user.name || '',
        email: user.email || '',
        pronouns: user.pronouns || '',

        age: user.age || '',
        weight: user.weight || '',
        height: user.height || '',
        units: user.units || '',
        
        sports: user.sports || '',
        goals: user.goals || '',
        
        personality: user.personality || '',
    });//[name, email, unit, personality]
    const [alertVisible, setAlertVisisble] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const colors = useTheme().colors;


    const styles = StyleSheet.create({
        entry: {
            flexDirection: "row",
            width: "90%",
            marginHorizontal: "5%",
            marginVertical: 3,
            backgroundColor: colors.primary,
            borderRadius: 10,
            padding: 5
        },
        label: {
            flex: 1,
            textAlign: "center",
        },
        input: {
            flex: 3,
            backgroundColor: "#00000022",
            borderRadius: 5,
            padding: 1,
        },        
        button: {
            flex: 2,
            backgroundColor: colors.primary,
            borderRadius: 10,
            padding: 1,
            textAlign: "center",
        },
        buttonText: {
            //fontSize: 10,
            color: "#000000"
        }
    });

    async function update() {

        try {
            const response = await fetch(`${config.URI}/api/protected/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(info)
            });

            const result = await response.json();
            
            if (response.status != 200) {
                setAlertMessage(response.status + ": " + result.message);
                setAlertVisisble(true);
                return;
            }
            setAlertMessage(result.message);
            setAlertVisisble(true);
            
        } catch (err) {
            console.log(err);
        }

    }

    async function logout(){
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    }

    return (
        <View >
            <BackButton navigation={navigation} />

            <Image
                style={{height: 80, width: "100%",resizeMode: "contain", alignSelf: "center" }}
                source={require('../assets/imgs/logos/banner_logo.png')}
            />

            <View
                style={{
                    borderBottomColor: colors.primary,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginVertical: 5,
                }}
            />

            <View style={styles.entry}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.space}></View>
                <TextInput
                    style={styles.input}
                    onChangeText={(string) => setInfo({ ...info, name: string })}
                    value={info.name}
                />
            </View>            
            <View style={styles.entry}>
                <Text style={styles.label}>Pronouns</Text>
                <View style={styles.space}></View>
                <TextInput
                    style={styles.input}
                    onChangeText={(string) => setInfo({ ...info, pronouns: string })}
                    value={info.pronouns}
                />
            </View>
            <View style={styles.entry}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.space}></View>
                <TextInput
                    style={styles.input}
                    onChangeText={(string) => setInfo({ ...info, email: string })}
                    value={info.email}
                />
            </View>

            <View
                style={{
                    borderBottomColor: colors.primary,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginVertical: 5,
                }}
            />

            
            <View style={styles.entry}>
                <Text style={styles.label}>Age</Text>
                <View style={styles.space}></View>
                <TextInput
                    style={styles.input}
                    //keyboardType='numeric'
                    onChangeText={(string) => setInfo({ ...info, age: string })}
                    value={info.age}
                    maxLength={3}
                />
            </View>

            <View style={styles.entry}>
                <Text style={styles.label}>Weight</Text>
                <View style={styles.space}></View>
                <TextInput
                    style={{
                        ...styles.input,
                        flex: 2
                    }}
                    //keyboardType='numeric'
                    onChangeText={(string) => setInfo({ ...info, weight: string })}
                    value={info.weight}
                    maxLength={3}
                />
                <Text style={{
                    ...styles.label,
                    textAlign: "left"
                }}>{
                    info.units == "Metric" ? "kg" : "lbs"
                }</Text>
            </View>

            <View style={styles.entry}>
                <Text style={styles.label}>Height</Text>
                <View style={styles.space}></View>
                <TextInput
                    style={{
                        ...styles.input,
                        flex: 2
                    }}
                    //keyboardType='numeric'
                    onChangeText={(string) => setInfo({ ...info, height: string })}
                    value={info.height}
                    maxLength={3}
                />
                <Text style={{
                    ...styles.label,
                    textAlign: "left"
                }}>{
                    info.units == "Metric" ? "cm" : "in"
                }</Text>
            </View>
            
            <View style={styles.entry}>
                <Text style={{
                    textAlign: "center",
                    flex: 2,
                    paddingTop: 15
                    }}>Units</Text>
                <SelectDropdown
                    data={unitOptions}
                    onSelect={(selectedItem, index) => {
                        setInfo({ ...info, units: selectedItem });
                    }}
                    defaultButtonText={info.units}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.button}
                />
            </View>


            <View
                style={{
                    borderBottomColor: colors.primary,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginVertical: 5,
                }}
            />

            <View style={styles.entry}>
                <Text style={styles.label}>Sports</Text>
                <View style={styles.space}></View>
                <TextInput
                    style={styles.input}
                    onChangeText={(string) => setInfo({ ...info, sports: string })}
                    value={info.sports}
                />
            </View>

            <View style={styles.entry}>
                <Text style={styles.label}>Goals</Text>
                <View style={styles.space}></View>
                <TextInput
                    style={styles.input}
                    onChangeText={(string) => setInfo({ ...info, goals: string })}
                    value={info.goals}
                />
            </View>

            <View
                style={{
                    borderBottomColor: colors.primary,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginVertical: 5,
                }}
            />
        
            <View style={styles.entry}>
                <Text style={{
                    textAlign: "center",
                    flex: 2,
                    paddingTop: 15
                    }}>AI Personality</Text>
                <SelectDropdown
                    data={personalityOptions}
                    onSelect={(selectedItem, index) => {
                        setInfo({ ...info, personality: selectedItem });
                    }}
                    defaultButtonText={info.personality}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.button}
                />
            </View>

            <View
                style={{
                    borderBottomColor: colors.primary,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginVertical: 5,
                }}
            />

            <Pressable
                onPress={update}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>


            <Pressable
                onPress={logout}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Log Out</Text>
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