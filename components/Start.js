import { getAuth, signInAnonymously } from 'firebase/auth';
import { useState } from "react";
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// background image
const image = require('../assets/bgImage.png');

const Start = ({ navigation }) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const [bgColor, setBgColor] = useState('');

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", { userID: result.user.uid, name: name, bgColor: bgColor });
                Alert.alert("Signed in successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in. Try again later.");
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
            <Text style={styles.appTitle}>Chat App</Text>
                <View style={styles.appContain}>
                    <TextInput style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="Your Name"
                    />
                    <Text>Choose Background Color</Text>
                    <View style={styles.bgButtonsContainer}>
                        <TouchableOpacity 
                            style={[styles.bgColorButtons, { backgroundColor: '#090C08' }, bgColor === '#090C08' && styles.selectedColor]}
                            onPress={() => setBgColor('#090C08')}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bgColorButtons, { backgroundColor: '#474056' }, bgColor === '#474056' && styles.selectedColor]}
                            onPress={() => setBgColor('#474056')}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bgColorButtons, { backgroundColor: '#8A95A5' }, bgColor === '#8A95A5' && styles.selectedColor]}
                            onPress={() => setBgColor('#8A95A5')}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bgColorButtons, { backgroundColor: '#B9C6AE' }, bgColor === '#B9C6AE' && styles.selectedColor]}
                            onPress={() => setBgColor('#B9C6AE')}
                        >
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            if (name == '') {
                                Alert.alert('Username does not exist');
                            } else {
                                signInUser();
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Start Chatting!</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomSpace}></View>
            </ImageBackground>
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%'
    },
    appTitle: {
        flex: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        margin: 45
    },
    appContain: {
        backgroundColor: '#FFFFFF',
        width: '88%',
        height: '44%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textInput: {
        textAlign: 'center',
        borderRadius: 3,
        borderColor: '757083',
        borderWidth: 1,
        fontSize: 16,
        fontWeight: '300',
        fontColor: '#757083',
        height: '18%',
        opacity: 50,
        padding: 10,
        width: '85%'
    },
    bgButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bgColorButtons: {
        width: 30,
        height: 30,
        borderRadius: 25,
        border: 3,
        margin: 5,

    },
    selectedColor: {
        borderColor: '#C0C0C0',
        borderWidth: 3
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#757083',
        borderRadius: 3,
        height: '18%',
        justifyContent: 'center',
        padding: 10,
        width: '85%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    bottomSpace: {
        marginBottom: 20
    }
})

export default Start;