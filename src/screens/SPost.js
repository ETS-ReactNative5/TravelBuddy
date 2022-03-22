import React from 'react'
import { Divider } from 'react-native-elements'
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { iconsDataSet } from '../data/posts'

const SPost = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical'></Divider>
      <PostHeader post={post}></PostHeader>
      <PostImage post={post} ></PostImage>
      <PostFooter />
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
        <Text style={{ color: "black", marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
      </View>
      <Text style={{ color: 'black', fontWeight: '900' }}>...</Text>
    </View>
  )
}

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 300, margin: 5 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: '100%', resizeMode: 'cover' }}
    />
  </View>
)

const PostFooter = () => {
  return (
    <View style={{
      flexDirection: 'row',
      margin: 5,
      alignItems: 'center'
    }}>
      <Icon imgStyle={styles.footerIcon} imgUrl={iconsDataSet[0].imageUrl}></Icon>
      <Icon imgStyle={styles.footerIcon} imgUrl={iconsDataSet[1].imageUrl}></Icon>
    </View>
  )
}

const Icon = ({ imgStyle, imgUrl }) => (
  <View style={{flexDirection: 'row',
  margin: 5,
  alignItems: 'center'}}>
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
  <Text style={{fontSize:15}}>Like</Text>
  </View>
)

const styles = StyleSheet.create({
  // for the avatarStyling
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501'
  },

  footerIcon: {
    width: 25,
    height: 25,
    marginLeft: "2%"
  }
})
export default SPost