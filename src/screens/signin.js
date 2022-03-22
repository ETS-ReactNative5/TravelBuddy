import React from 'react'
import { View, Text, SafeAreaView,StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import Post from "./Post";
import {POSTS} from "../data/posts"

const signin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {POSTS.map((post,index)=> (
            <Post post={post} key={index}></Post>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default signin

const styles=StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
  },
})