import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { iconsDataSet } from '../data/posts'
import { getFormattedDateForPost } from "../UtilPackages/Date";
import { getTokenizeContent } from "../UtilPackages/String"

import { Divider } from 'react-native-elements'
import { useFonts } from 'expo-font';


const Post = ({ navigation, post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider style={{ color: "black", paddingBottom: 2 }} width={1} orientation='vertical'></Divider>
      <PostHeader post={post}></PostHeader>
      <PostBody post={post}></PostBody>
      <PostFooter navigation={navigation} post={post} />
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
      {post.assets.length > 0 ? <PostImage post={post} ></PostImage> : <View></View>}
    </View>
  )
}

const PostContent = ({ post }) => {
  let [fontsLoaded, error] = useFonts({
    'EBGaramond': require("../../assets/fonts/EBGaramond-Regular.ttf"),
    'EBGaramond-B': require("../../assets/fonts/EBGaramond-Bold.ttf")
  })

  const _style = [//style schemes for fonts in postContent
    { color: "black", fontFamily: "EBGaramond", fontSize: 18 },
    { color: "#3281a8", fontSize: 17, fontFamily: "EBGaramond" },
    { color: "black", fontFamily: "EBGaramond-B", fontSize: 18 }
  ]

  if (!fontsLoaded) {//if fonts not loaded properly
    return ( //@use a app loader component instead of Empty view
      <View></View>
    )
  }

  return (
    <View style={{ margin: 5 }}>
      {post.map((element1, index1) =>
      (
        <View key={index1} style={
          {
            flexDirection: 'row',
            // margin: 5,
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
      source={{ uri: post.assets[0].imageUrl }}
      style={{ height: '100%', resizeMode: 'cover' }}
    />
  </View>
)

const PostFooter = ({ navigation, post }) => {
  return (
    <View style={{ backgroundColor: '#f0f2f0', borderRadius: 10, marginLeft: 10, marginRight: 10 }}>
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
        <Icon navigation={navigation} imgStyle={styles.footerIcon} imgUrl={iconsDataSet[0].imageUrl} imageName={iconsDataSet[0].imageName} links="like"></Icon>
        <Icon navigation={navigation} imgStyle={styles.footerIcon} imgUrl={iconsDataSet[1].imageUrl} imageName={iconsDataSet[1].imageName} links="comments"></Icon>
      </View>
    </View>
  )
}

const Icon = ({ navigation, imgStyle, imgUrl, imageName, links }) => (
  <View >
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}
      onPress={() => navigation.navigate(links)}
    >
      <Image style={imgStyle} source={{ uri: imgUrl }} />
      <Text style={{ fontSize: 15 }}>{imageName}</Text>
    </TouchableOpacity>
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