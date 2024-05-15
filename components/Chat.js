import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Chat = ({ route, navigation }) => {
    const { bgColor, name } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <Text>Let's Chat!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Chat;