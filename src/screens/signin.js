import React from 'react'
import { View, Text, SafeAreaView,StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import SPost from "./SPost";
import {POSTS} from "../data/posts"

const signin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {POSTS.map((post,index)=> (
            <SPost post={post} key={index}></SPost>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default signin

const styles=StyleSheet.create({
  container:{
    backgroundColor:'black',
    flex:1,
  },
})