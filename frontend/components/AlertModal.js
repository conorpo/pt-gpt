import react from 'react';
import { View, Text, StyleSheet, Image, Modal, Pressable} from 'react-native';
import { useTheme } from '@react-navigation/native';

const AlertModal = ({visible, setVisible, message}) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: "#000000aa"
        },
        modal: {
            backgroundColor: "#ffffff",
            padding: 25,
            maxWidth: "80%",
            borderRadius: 10
        },
        closeButton: {
            backgroundColor: colors.primary,
            marginTop: 10,
            padding: 10,
            borderRadius: 10,
            elevation: 2
        },
    });
    

    return (
        <Modal
            transparent={true}
            visible={visible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <Text>{message}</Text>
                    <Pressable 
                        style={styles.closeButton}
                        onPress={() => setVisible(false)}
                    >
                        <Text>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

export default AlertModal;