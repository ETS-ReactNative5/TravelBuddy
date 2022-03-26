import React, { useState, useEffect, useRef } from 'react';
import {
    View, StyleSheet, Text, Image, FlatList, Platform, KeyboardAvoidingView, SafeAreaView,
    TextInput, TouchableWithoutFeedback, Button, Keyboard
} from 'react-native';

import Header from './Appbar';
import { getChatData } from '../data/posts';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Input } from 'react-native-elements';
import { getFormattedDateForPost } from '../UtilPackages/Date';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { JSHash, CONSTANTS } from 'react-native-hash';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
    const { _groupID, _groupName } = route.params;

    const [messages, setMessages] = useState(null);
    const isFocused = useIsFocused();

    const currUser = {
        _id: "user1",
        name: "Jane Doe",
        avatar: 'https://i.ibb.co/182bP1y/4k.png'
    }

    const loadCommentList = () => {
        setMessages(getChatData(_groupID))

    }

    const sendMessage = () => {
        console.log("sendMessage")
    }

    const chat = <GiftedChat messages={messages} onSend={sendMessage} user={currUser} />

    useEffect(() => {
        if (isFocused) {
            loadCommentList()
        }
    }, [isFocused]);


    if (messages) return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {chat}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
    else return (
        <View>
            <Header title={_groupName}></Header>
            <Text>{"Loading"}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    keyboardContainer: {
        flex: 1
    },
    inner: {
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        // height: 40,
        borderColor: "#000000",
        margin: 1,
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        marginBottom: 3
    },
    btnContainer: {
        backgroundColor: "red",
        color: "red"
    }
})


export default Chat
