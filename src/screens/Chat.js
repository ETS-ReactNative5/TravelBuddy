import React, { useState, useEffect, useRef } from 'react';
import {
    View, StyleSheet, Text, Image, FlatList, Platform, KeyboardAvoidingView, SafeAreaView,
    TextInput, TouchableWithoutFeedback, Button, Keyboard
} from 'react-native';

import Header from './Appbar';
import { addComment, getCommentsFunction } from '../data/posts';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Input } from 'react-native-elements';
import { getFormattedDateForPost } from '../UtilPackages/Date';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { JSHash, CONSTANTS } from 'react-native-hash';

const Chat = ({route,navigation}) => {
    const {_groupID,_groupName}= route.params;

    const [CommentList, setCommentList] = useState(null);
    const isFocused = useIsFocused();

    const loadCommentList=()=>{
        setCommentList(getCommentsFunction(_groupID))
    }

    useEffect(() => {
       if(isFocused){
        loadCommentList()
       }
    }, [isFocused]);


  if(CommentList) return (
    <View>
        <Header title={_groupName}></Header>
        {CommentList.map((element,index)=>{
            return (
                <Text key={index}>{element.content}</Text>
            )
        })}
    </View>
  )
  else return (
    <View>
        <Header title={_groupName}></Header>
      <Text>{"Loading"}</Text>
    </View>
  )
}

export default Chat