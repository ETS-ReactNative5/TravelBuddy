import React, { useState, useEffect, useRef } from 'react';
import {
    View, StyleSheet, Text, Image, FlatList, Platform, KeyboardAvoidingView, SafeAreaView,
    TextInput, TouchableWithoutFeedback, Button, Keyboard
} from 'react-native';

import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { GiftedChat,Send } from 'react-native-gifted-chat';
import { getStorage as AsyncStorage } from '../../../StateStorage';
import { Loader } from '../Loader';
import {Controller} from "../../../BLogic/Controller";
import { PersistanceHandler } from '../../../PersistanceHandler/Store';
import { getFormattedDateForPost } from '../../UtilPackages/Date';
// import { getChatData } from '../Manager/BLogic';
// import { ScrollView } from 'react-native-gesture-handler';
// import { Divider, Input } from 'react-native-elements';
// import Header from './Appbar';
// import { JSHash, CONSTANTS } from 'react-native-hash';
// import { authUpdate } from '../../../firebase/firebase-config';

export const Chat = ({ route, navigation }) => {
    const { _groupIDParam, /*_groupName*/ } = route.params;
    const [currUser, setcurrUser] = useState(null);
    const [messages, setMessages] = useState(null);
    const isFocused = useIsFocused();

    // const currUser = {
    //     _id: "user1",
    //     name: "Jane Doe",
    //     avatar: 'https://i.ibb.co/182bP1y/4k.png'
    // }

    const fetchCurrentUser=async ()=>{
        let _data=await AsyncStorage("UserData")
        setcurrUser(prev=>{ return {_id:_data.uid,name:_data.name,avatar:_data.image} })
    }

    const loadCommentList =async  () => {
        // setMessages(getChatData(_groupIDParam))
        let obj=new PersistanceHandler()
        setMessages(await obj.getChatData(_groupIDParam));
    }

    const saveMessageDB = (_messages) => {
        
        let obj=new Controller();
        try {
            let currMsg = _messages[0]
            // console.log("myGrooy",_groupIDParam)
            // console.log(currMsg.createdAt, currMsg.user._id, currMsg.text, _groupIDParam,currUser.name,currUser.avatar)
            obj.addComment(currMsg.createdAt, currMsg.user._id, currMsg.text, _groupIDParam,currUser.name,currUser.avatar)
            
        } catch (e) {
            console.log(e)
        }
    }

    const onSend = (_messages) => { //callback function for send
        saveMessageDB(_messages);
        setMessages(previousMessages => GiftedChat.append(previousMessages, _messages))
    }

    const customSendButton = (props) => {
        return (
            <Send
                {...props}
            >
                <Icon style={{paddingBottom:10,paddingRight:8}}
                    name='send'
                    type='ion-icon'
                    color='#517fa4'
                />

            </Send>
        )
    }

    const chat = <GiftedChat
        messages={messages} onSend={onSend} user={currUser} renderSend={customSendButton}
        alwaysShowSend={true}
    />

    useEffect(async () => {
        await fetchCurrentUser();
        if (isFocused) {
            await loadCommentList()
        }
    }, [isFocused]);


    if(currUser){
        if (messages ) return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardContainer}
            >
                {/* <Header title={_groupName}></Header> */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {chat}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
        else return (
            <Loader></Loader>
        )
    }else return (
        <Loader></Loader>
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

