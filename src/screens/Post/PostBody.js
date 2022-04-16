import React from 'react'
import { View, Text, Image } from 'react-native'
//external dependacies
import { useFonts } from 'expo-font';
import {getTokenizeContent} from "./Dependancy"

export const PostBody = ({ post }) => {
    return (
      <View style={{ paddingLeft: 10 }}>
        <PostContent post={getTokenizeContent(post.bodyContent)}></PostContent>
        {post.assets.length > 0 ? <PostImage post={post} ></PostImage> : <View></View>}
      </View>
    )
  }
  
  const PostContent = ({ post }) => {
    let [fontsLoaded, error] = useFonts({
      'EBGaramond': require("../../../assets/fonts/EBGaramond-Regular.ttf"),
      'EBGaramond-B': require("../../../assets/fonts/EBGaramond-Bold.ttf")
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
              alignItems: 'center',
              flexWrap:"wrap"
            }}>
            {element1.map((element2, index2) => (
              <Text key={index2} style={_style[element2[0]]}>{element2[1]} {element2[3]==1 ? " " : ""}</Text>
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