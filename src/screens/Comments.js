import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';

import Header from './Appbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCommentsFunction } from '../data/posts';

const Comments = ({route,navigation}) => {
    const {_postID} =route.params;  //fetching param from parent elements
    const [Comments, setComments] = useState([]);

    const fetchComments=(postID)=>{
        setComments(getCommentsFunction(postID))
    }

    const makeComment=(postID,userID,Content)=>{
        //add comment to post and also increment number of posts
        //to store comment on the comment data
        //here use hash function to generate postID
    }

    useEffect(()=>{
        fetchComments(_postID)
    },[])

    return (
        <View>
            <Header title={"comments"}></Header>
            <Text>{"Comments component"}</Text> 
        </View>
    );
}

const styles = StyleSheet.create({})

export default Comments;
