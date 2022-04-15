import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

//External dependancies
import { Divider } from 'react-native-elements';
import { getFormattedDateForPost } from '../../UtilPackages/Date';

export const Comment = ({ commentData }) => {
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


const CommentHeader = ({ imgUrl, userName }) => {
    return (
        <View
        // style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
        >
            <View style={styles.commentHeader}>
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



const styles = StyleSheet.create({
    commentHeader: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center'
    },
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
