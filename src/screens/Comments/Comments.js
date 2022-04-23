import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet,Platform, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
// import { addComment, getCommentsFunction, updateCommentCount } from '../../Manager/BLogic'; //work here
import { getStorage as AsyncStoreFunc } from '../../../StateStorage';
import { Comment } from './Comment';
import { Controller } from '../../../BLogic/Controller';
// import { JSHash, CONSTANTS } from 'react-native-hash';
// import Header from '../Appbar';

export const Comments = ({ route, navigation }) => {
    const scrollViewRef = useRef();
    const isFocused = useIsFocused();
    const { _postID } = route.params;  //fetching param from parent elements 
    const [Comments, setComments] = useState([]);
    const [InputValue, setInputValue] = useState("");
    const [UserID, setUserID] = useState("");
    const [UserData,setUserData]=useState(null);
    
    const fetchComments = async (postID) => {
        let obj=new Controller();
        setComments(await obj.getCommentsFunction(postID)) //work here
    }

    const updateMakeCommentView = (_userID, _content, _timeStamp,_userName,_userImage) => {
        //update comment view here
        setComments(prev => {
            return [...prev,
            {
                content: _content,
                userID: _userID,
                timeStamp: _timeStamp,
                userData: {
                    name: _userName, //"currentUser",
                    av: _userImage  //"https://i.ibb.co/182bP1y/4k.png"
                }
            }
            ]
        })
    }

    const updateMakeCommentStorage = (_postID, _inputValue, _UserID, _timeStamp, _commentID,_userName,_userImage) => {
        // updateMakeComment 
        let obj=new Controller();
        obj.addComment(_timeStamp, _UserID, _inputValue, _postID,_userName,_userImage)  //work here
        obj.updateCommentCount(_postID, Comments.length); //work here
    }

    const makeComment = async () => { //triggered function
        let _timeStamp = new Date()
        _timeStamp = _timeStamp.toString();
        let _commentID=""//await generateCommentID(_timeStamp,_postID,InputValue)
        updateMakeCommentStorage(_postID, InputValue, UserData.uid, _timeStamp, _commentID,UserData.name,UserData.image)
        updateMakeCommentView(UserData.uid, InputValue, _timeStamp,UserData.name,UserData.image);
        setInputValue("") //reset input for textbox

        //add comment to post and also increment number of posts
        //to store comment on the comment data
        //here use hash function to generate commentID
    }

    const fetchUserDetails = async () => {
        //fetch from firebase
        setUserData(await AsyncStoreFunc("UserData"))
    }

    useEffect(async () => {
        console.log("working")
        await fetchUserDetails();
        if (isFocused) {
            await fetchComments(_postID)
            console.log("isFocusedCalled",Comments)
        }
    }, [isFocused])



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >
            {/* <Header title={"Comments"}></Header> */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    >
                        {Comments ? Comments.length>0 ? Comments.map((element, index) => (
                            <Comment key={index} commentData={element} />
                        )):<></>:<></>}
                    </ScrollView>

                    <View style={styles.textInput}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <TextInput value={InputValue} multiline={true} onChange={(e) => setInputValue(e.nativeEvent.text)} placeholder="write comment" style={{ flex: 100, display: "flex" }} />
                            <Icon
                                // reverse
                                name='send'
                                type='ion-icon'
                                color='#517fa4'
                                onPress={() => makeComment()}
                            />
                        </View>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
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
        borderColor: "#000000",
        margin: 1,
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        marginBottom: 3
    }
})
