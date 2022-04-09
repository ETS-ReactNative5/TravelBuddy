import React, { useState, useEffect, useRef } from 'react';
import {
    View, StyleSheet, Text, Image, FlatList, Platform, KeyboardAvoidingView, SafeAreaView,
    TextInput, TouchableWithoutFeedback, Button, Keyboard
} from 'react-native';

import Header from './Appbar';
import { addComment, getCommentsFunction, updateCommentCount } from '../Manager/BLogic';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Input } from 'react-native-elements';
import { getFormattedDateForPost } from '../UtilPackages/Date';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { JSHash, CONSTANTS } from 'react-native-hash';

const CommentHeader = ({ imgUrl, userName }) => {
    return (
        <View
        // style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
        >
            <View style={
                {
                    flexDirection: 'row',
                    margin: 5,
                    alignItems: 'center'
                }
            }>
                <Image source={{ uri: imgUrl }} style={styles.story} ></Image>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Text style={{ color: "black", marginLeft: 5, fontWeight: '700' }}>{userName}</Text>
                </View>
            </View>

        </View>
    )
}

const CommentBody = ({ content }) => {
    return (
        <Text style={{ backgroundColor: "#f5f3f0", borderRadius: 10, marginLeft: 10, marginRight: 10, padding: 5 }}>
            {content}
        </Text>
    )
}

const Comment = ({ commentData }) => {
    const sampleData = "asdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdadasdad"
    return (
        <View>
            <Divider></Divider>
            <CommentHeader imgUrl={commentData.userData.av} userName={commentData.userData.name} />
            <CommentBody content={commentData.content} />
            <Text style={{ fontSize: 11, color: "grey", paddingLeft: 10 }}>{"Commented on "}{getFormattedDateForPost(commentData.timeStamp)}</Text>
            <Divider></Divider>
        </View>
    )
}

const Comments = ({ route, navigation }) => {
    const scrollViewRef = useRef();
    const isFocused = useIsFocused();
    const { _postID } = route.params;  //fetching param from parent elements 
    const [Comments, setComments] = useState([]);
    const [InputValue, setInputValue] = useState("");
    const [UserID, setUserID] = useState("");

    const fetchComments = async (postID) => {
        setComments(await getCommentsFunction(postID))
    }

    const updateMakeCommentView = (_userID, _content, _timeStamp) => {
        //update comment view here
        setComments(prev => {
            return [...prev,
            {
                content: _content,
                userID: _userID,
                timeStamp: _timeStamp,
                userData: {
                    name: "currentUser",
                    av: "https://i.ibb.co/182bP1y/4k.png"
                }
            }
            ]
        })
    }

    const updateMakeCommentStorage = (_postID, _inputValue, _UserID, _timeStamp, _commentID) => {
        //updateMakeComment 
        addComment(_timeStamp, _UserID, _inputValue, _postID, _commentID)
        updateCommentCount(_postID, Comments.length);
    }

    const generateCommentID=async (_timeStamp,_postID,_comment)=>{
        let hashTarget=_timeStamp+_postID
        try{
            _comment.length>10 ? hashTarget=hashTarget+_comment.slice(0,10) : hashTarget=hashTarget+_comment
            let retCommentID = await JSHash(hashTarget, CONSTANTS.HashAlgorithms.sha256)  //h(comment[1.10]|timestamp|user)
            return retCommentID;
        }catch(e){
            console.log(e)
            let ret=new Date().toString();
            return ret;
        } 
    }

    const makeComment = async () => { //triggered function
        // console.log(_postID, "|", InputValue, "|", UserID);
        let _timeStamp = new Date()
        _timeStamp = _timeStamp.toString();
        let _commentID=await generateCommentID(_timeStamp,_postID,InputValue)
        updateMakeCommentStorage(_postID, InputValue, UserID, _timeStamp, _commentID)
        updateMakeCommentView(UserID, InputValue, _timeStamp)
        setInputValue("") //reset input for textbox

        //add comment to post and also increment number of posts
        //to store comment on the comment data
        //here use hash function to generate commentID
    }

    const fetchUserDetails = () => {
        //fetch from firebase
        setUserID("user1")
    }

    useEffect(async () => {
        console.log("working")
        if (isFocused) {
            fetchUserDetails();
            await fetchComments(_postID)
            console.log("isFocusedCalled",Comments)
        }
    }, [isFocused])



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >
            <Header title={"Comments"}></Header>
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

export default Comments;
