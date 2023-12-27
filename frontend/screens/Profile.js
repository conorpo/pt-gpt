import {useEffect, useState} from "react";
import { Button, View, StyleSheet, TextInput, Text, Pressable, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../components/AlertModal';
import SelectDropdown from 'react-native-select-dropdown'
import { useTheme } from '@react-navigation/native';

import { useMainContext } from '../contexts/Main';

import BackButton from '../components/BackButton';

import authService from "../services/authService";
import profileService from "../services/profileService";

const unitOptions = ["Metric", "Imperial"];
const personalityOptions = ["AI", "Cthulhu", "Dracula", "Hercules", "Mickey Mouse", "Popeye", "Robin Hood", "Sherlock", "Tarzan", "Thor", "Zorro"];

const ProfileScreen = ({ navigation }) => {
    const { profile, setProfile } = useMainContext();
    
    const auth = getAuth();

    const [localProfile, setLocalProfile] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [difference, setDifference] = useState({});

    const {showAlertModal} = useMainContext();

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
        disabledButton: {
            backgroundColor: "#00000022",
            pointerEvents: "none"
        },
        buttonText: {
            //fontSize: 10,
            color: "#000000"
        }
    });

    function initializeLocalState() {
        setLocalProfile({
            pronouns: profile.pronouns || '',
            age: profile.age || '',
            weight: profile.weight || '',
            height: profile.height || '',
            units: profile.units || '',
            sports: profile.sports || '',
            goals: profile.goals || '',
            personality: profile.personality || '',
        });
        setName(auth.currentUser.displayName || '');
        setEmail(auth.currentUser.email || '');
        setDifference({
            name: false,
            email: false,
            profile: false
        })
    }
    useEffect(initializeLocalState, [profile]); // Whenever profile changes, update local state

    useEffect(() => {
        setDifference({
            ...difference,
            name: name.localeCompare(auth.currentUser.displayName) != 0
        })
    }, [name]); // Whenever state changes, check if there are pending changes
    useEffect(() => {
        setDifference({
            ...difference,
            email: email.localeCompare(auth.currentUser.email) != 0
        })
    }, [email]); // Whenever state changes, check if there are pending changes
    useEffect(() => {
        setDifference({
            ...difference,
            profile: Object.keys(localProfile).some(key => localProfile[key] != profile[key])
        })
    }, [localProfile]); // Whenever state changes, check if there are pending changes
    
    async function update() {
        try {
            if(difference.name) await authService.updateProfile({displayName: name});
            if(difference.email) await authService.updateEmail(email);
            if(difference.profile) await profileService.setProfileDoc(profile, setProfile, localProfile);          
        } catch (err) {
            console.log(err);
            showAlertModal(err.message);
        }
    }

    async function logout(){
        await authService.signOut();
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
                onPress={initializeLocalState}
                style={[
                    styles.button,
                    Object.values(difference).every((value) => !value) && styles.disabledButton
                ]}
                disabled={Object.values(difference).every((value) => !value)}
            >
                <Text style={styles.buttonText}>Undo Changes</Text>
            </Pressable>

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

            
            <AlertModal></AlertModal>
        </View>
    );
}

export default ProfileScreen;