import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
//external dependancies
import { Divider } from 'react-native-elements'
import { PostBody } from './PostBody';
import { getFormattedDateForPost, like1, like2, comment1 } from './Dependancy';
import { authUpdate } from '../../../firebase/firebase-config';

const Post = ({ navigation, post }) => {
  const isLoadingComplete = true;
  if (!isLoadingComplete) {
    return <View><Text>{"Empty text"}</Text></View>
  }
  else return (
    <View style={{ marginBottom: 30 }}>
      <Divider style={{ color: "black", paddingBottom: 2 }} width={1} orientation='vertical'></Divider>
      <PostHeader post={post}></PostHeader>
      <PostBody post={post}></PostBody>
      <PostFooter navigation={navigation} post={post} />
    </View>
  )
}

const PostHeader = ({ post }) => {
  /** requires: post.locationName, .user(name)  .locationDesc , .timestamp, .profilepictures */
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
          {/* {post.locationDesc == null | "" ? <View></View> :
            <>
              <Text style={{ color: "black", marginLeft: 5, fontWeight: '400' }}>{"is at"}</Text>
              <Text style={{ color: "black", marginLeft: 5, fontWeight: '700' }}>{post.locationName}</Text>
              <Text style={{ color: "black", marginLeft: 5, fontWeight: '700' }}>{"- "}{post.locationDesc}</Text>
            </>
          } */}
        </View>
      </View>
      <Text style={{ paddingLeft: 10, fontSize: 11, color: "grey" }}>{"Posted on "}{getFormattedDateForPost(post.timestamp)}</Text>
    </View>
  )
}

const PostFooter = ({ navigation, post }) => {
  //require post.id , post.likes
  const UserID = authUpdate.currentUser.uid;
  const [LikedFlag, setLikedFlag] = useState(post.likes.includes(UserID));
  const [Likes, setLikes] = useState(post.likes.length);
  const handleLike = () => {
    setLikedFlag((prevLikedFlag) => {
      if (prevLikedFlag == false) {
        setLikes(prev => prev + 1);
      } else {
        setLikes(prev => prev - 1);
      }
      return !prevLikedFlag

    })
  }



  return (
    <View style={{ backgroundColor: '#f0f2f0', borderRadius: 10, marginLeft: 10, marginRight: 10 }}>
      <View style={{
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={{ fontSize: 10 }}>{Likes} {"Likes"}</Text>
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
        <Icon navigation={navigation} imgStyle={styles.footerIcon} imgUrl={[like1, like2]} imageName={"interesting"} links="like" postID={post.postID} handleLike={handleLike} likeStatus={LikedFlag}></Icon>
        <Icon navigation={navigation} imgStyle={styles.footerIcon} imgUrl={[comment1]} imageName={"comments"} links="comments" postID={post.postID} handleLike={null} likeStatus={LikedFlag}></Icon>
      </View>
    </View>
  )
}

const Icon = ({ navigation, imgStyle, imgUrl, imageName, links, postID, handleLike, likeStatus }) => {
  const [LikedFlag, setLikedFlag] = useState(likeStatus);


  return (
    <View >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={() => {
          if (links == "comments")
            navigation.navigate(links, { _postID: postID })
          else {
            handleLike()
            setLikedFlag(currentFlag => !currentFlag)
          }
        }}
      >
        {imageName == "interesting" ? <Image style={imgStyle} source={LikedFlag ? imgUrl[1] : imgUrl[0]} />
          : <Image style={imgStyle} source={imgUrl[0]} />
        }
        <Text style={{ fontSize: 15 }}>{imageName}</Text>
      </TouchableOpacity>
    </View>
  )
}

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