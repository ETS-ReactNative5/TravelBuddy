import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet, Text, Image, FlatList, Platform, KeyboardAvoidingView, SafeAreaView,
    TextInput, TouchableWithoutFeedback, Button, Keyboard
} from 'react-native';

import Header from './Appbar';
import { getCommentsFunction } from '../data/posts';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import { getFormattedDateForPost } from '../UtilPackages/Date';
import { Icon } from 'react-native-elements';

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
    const { _postID } = route.params;  //fetching param from parent elements
    const [Comments, setComments] = useState([]);

    const fetchComments = (postID) => {
        setComments(getCommentsFunction(postID))
    }

    const makeComment = (postID, userID, Content) => {
        //add comment to post and also increment number of posts
        //to store comment on the comment data
        //here use hash function to generate postID
    }

    useEffect(() => {
        fetchComments(_postID)
        console.log("working")
    }, [])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >
            <Header title={"comments"}></Header>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <ScrollView>
                        {Comments.map((element, index) => (
                            <Comment key={index} commentData={element} />
                        ))}
                    </ScrollView>

                    <View style={styles.textInput}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <TextInput placeholder="write comment" style={{ flex: 100,display:"flex" }} />
                            <Icon
                                // reverse
                                name='send'
                                type='ion-icon'
                                color='#517fa4'
                                onPress={()=>console.log("make comment")}
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
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "red",
        color: "red"
    }
})

export default Comments;
