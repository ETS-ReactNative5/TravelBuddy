import React from 'react'
import { Divider } from 'react-native-elements'
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'

const SPost = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical'></Divider>
      <PostHeader post={post}></PostHeader>
    </View>
  )
}

const PostHeader = ({ post }) => {
  return (
    <View>
      <View>
        <Image></Image>
        <Text style={{color:"white"}}>{post.timestamp}</Text>
      </View>
    </View>
  )
}
export default SPost