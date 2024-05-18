import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const { bgColor, name } = route.params;
    const [messages, setMessages] = useState([]);

    // onSend function called when user sends messages

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
        setMessages([
            {
                _id: 1,
                text: 'Hello Developer!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any'
                },
            },
            {
                _id: 2,
                text: 'You have entered the chat!',
                createdAt: new Date(),
                system: true
            },
        ]);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
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