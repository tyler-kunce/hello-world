import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import MapView from 'react-native-maps';

import CustomActions from './CustomActions';

const Chat = ({ db, isConnected, navigation, route, storage }) => {
    const { bgColor, name, userID } = route.params;
    const [messages, setMessages] = useState([]);

    // onSend function called when user sends messages

    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
    }

    // renderBubble to format message bubbles

    const renderBubble = (props) => {
        return <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: '#AF9F6'
            },
            left: {
                backgroundColor: '#F0000FF'
            }
        }}
        />
    }

    const renderInputToolbar = (props) => {
        if (isConnected)
            return <InputToolbar
            {...props} />;
        else return null;
    }

    // Setting messages state with static and system messages
    let unsubMessages
    useEffect(() => {
        navigation.setOptions({ title: name });

        if (isConnected === true) {

            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()),});
                });
                cacheMessages(newMessages);
                setMessages(newMessages);    
            });
        } else loadCachedMessages();

        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    };

    const renderCustomActions = (props) => {
        return <CustomActions onSend={onSend} storage={storage} {...props} />;
    };

    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3}}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <GiftedChat
                messages={messages}
                renderActions={renderCustomActions}
                renderBubble={renderBubble}
                renderCustomView={renderCustomView}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
                />
                                <View style={styles.bottomSpace}></View>

                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSpace: {
        marginBottom: 20
    }
});

export default Chat;