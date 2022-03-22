import React from 'react'
import { View, Text, SafeAreaView,StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import Post from "./Post";  //Post component
import { POSTS } from '../data/posts'; //Post data


const signin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
       {POSTS.map((element,index)=>(
         <Post post={element} key={index}></Post>
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