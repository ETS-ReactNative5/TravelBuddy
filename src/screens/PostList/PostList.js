import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Post } from "../Post";
// import { getPost } from '../../Manager/BLogic'; //Post data
import { Controller } from '../../../BLogic/Controller';
import { Loader } from '../Loader/Loader';


export const PostList = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [POSTSDATA, setPOSTSDATA] = useState(null);
  useEffect(async () => {
    console.log("useEffect -reupload post")
    if (isFocused) {
      let obj = new Controller()
      setPOSTSDATA(await obj.getAllPost())
      console.log("useEffect -reupload post")

    }
  }, [isFocused]);

  if (POSTSDATA) return (
    <View style={styles.container}>
      <View style={{
        padding: 10, marginLeft: 10, marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
      
        // backgroundColor: 'black',
      }}>
        <TouchableOpacity onPress={() => navigation.navigate("Create Post")}><Text>{"CreatePost"}</Text></TouchableOpacity>
      </View>
      <ScrollView>
        {POSTSDATA.map((element, index) => (
          <Post navigation={navigation} post={element} key={index} ></Post>
        ))}
      </ScrollView>
    </View>
  )
  else return (
    <Loader></Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})