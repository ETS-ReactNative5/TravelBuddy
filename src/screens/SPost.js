import React from 'react'
import { Divider } from 'react-native-elements'
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
// import styles from 'react-native-gesture-bottom-sheet/src/BottomSheet/styles'

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
    <View style={
      {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center'
      }
    }>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: post.profile_pictures }} style={styles.story} ></Image>
        <Text style={{ color: "white", marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
      </View>
      <Text style={{color:'white',fontWeight:'900'}}>...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  // for the avatarStyling
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501'
  }
})
export default SPost