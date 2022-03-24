import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';

import { getCommentsFunction } from '../data/posts';

const Comments = ({route,navigation}) => {
    const {_postID} =route.params;  //fetching param from parent elements
    const [Comments, setComments] = useState([]);

    const fetchComments=(postID)=>{
        setComments(getCommentsFunction(postID))
    }

    const makeComment=(postID,userID,Content)=>{
        //to store comment on the comment data
        //here use hash function to generate postID
    }

    useEffect(()=>{
        fetchComments(_postID)
    },[Comments])

    return (
        <View>
            <Text>{"Comments component"}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("main")}> 
                <Text>{"Click me"}</Text>
            </TouchableOpacity>
            <Text>{_postID}</Text>
            <View>
                {Comments.map((elem,index)=>
                <Text>{elem.comment}</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Comments;
