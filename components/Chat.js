import { async } from '@firebase/util';
import {addDoc, collection, getDocs, onSnapshot, query, orderBy, DocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ db, navigation, route }) => {
    const { bgColor, name, userID } = route.params;
    const [messages, setMessages] = useState([]);

    // onSend function called when user sends messages

    const onSend = async (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
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

    // Setting messages state with static and system messages

    useEffect(() => {
        navigation.setOptions({ title: name });
        const unsubChat = onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'desc')), (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()),})
            });
            setMessages(newMessages);
        })
        return () => {
            if (unsubChat) unsubChat();
        }
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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