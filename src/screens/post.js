import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Divider } from 'react-native-elements'
import { iconsDataSet } from '../data/posts'
import { getFormattedDateForPost } from "../UtilPackages/Date";
import { getTokenizeContent } from "../UtilPackages/String"

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider style={{ color: "black", paddingBottom: 2 }} width={1} orientation='vertical'></Divider>
      <PostHeader post={post}></PostHeader>
      <PostBody post={post}></PostBody>
      <PostFooter post={post} />
    </View>
  )
}

const PostHeader = ({ post }) => {

  return (
    <View>

      <View style={
        {
          flexDirection: 'row',
          margin: 5,
          alignItems: 'center'
        }
      }>
        <Image source={{ uri: post.profile_pictures }} style={styles.story} ></Image>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={{ color: "black", marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
          <Text style={{ color: "black", marginLeft: 5, fontWeight: '400' }}>{"is at"}</Text>
          <Text style={{ color: "black", marginLeft: 5, fontWeight: '700' }}>{post.locationName}</Text>
          {post.locationDesc == null | "" ? <View></View> :
            <Text style={{ color: "black", marginLeft: 5, fontWeight: '700' }}>{"- "}{post.locationDesc} {"asdasdasdasdasdaaaa"}</Text>
          }
        </View>
      </View>
      <Text style={{ paddingLeft: 10, fontSize: 11, color: "grey" }}>{"Posted on "}{getFormattedDateForPost(post.timestamp)}</Text>
    </View>
  )
}

const PostBody = ({ post }) => {
  return (
    <View style={{ paddingLeft: 10 }}>
      <PostContent post={getTokenizeContent(post.bodyContent)}></PostContent>
      <PostImage post={post} ></PostImage>
    </View>
  )
}

const PostContent = ({ post }) => {
  // detect and then replace that string with blue color
  //replace quoted area inside with underline or bold format.
  const _style = [{ color: "black" }, { color: "#3281a8", fontSize: 15 }, { color: "black", fontWeight: 'bold' }]


  return (
    <View>
      {post.map((element1,index1)=>
      (
        <View key={index1} style={
          {
            flexDirection: 'row',
            margin: 5,
            alignItems: 'center'
          }}>
          {element1.map((element2, index2) => (
            <Text key={index2} style={_style[element2[0]]}>{element2[1]}{" "}</Text>
          ))
          }
        </View>
      ))}
    </View>
  )
}

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 200, marginTop: 5, marginBottom: 5, marginRight: 5 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: '100%', resizeMode: 'cover' }}
    />
  </View>
)

const PostFooter = ({ post }) => {
  return (
    <View>
      <View style={{
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={{ fontSize: 10 }}>{post.numberOfLikes} {"Likes"}</Text>
        <Text style={{ fontSize: 10 }}>{post.numberOfComments} {"Comments"}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Icon imgStyle={styles.footerIcon} imgUrl={iconsDataSet[0].imageUrl} imageName={iconsDataSet[0].imageName}></Icon>
        <Icon imgStyle={styles.footerIcon} imgUrl={iconsDataSet[1].imageUrl} imageName={iconsDataSet[1].imageName}></Icon>
      </View>
    </View>
  )
}

const Icon = ({ imgStyle, imgUrl, imageName }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center'
  }}>
    <TouchableOpacity>
      <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
    <Text style={{ fontSize: 15 }}>{imageName}</Text>
  </View>
)

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 10,
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
export default Post