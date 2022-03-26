import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import Post from './post';  //Post component
import { POSTS } from '../data/posts'; //Post data
import Header from "./Appbar"
import { SafeAreaView } from "react-native-safe-area-context"
import { useIsFocused } from '@react-navigation/native';

const signin = ({ navigation }) => {
  const isFocused = useIsFocused();
const [POSTSDATA, setPOSTSDATA] = useState([]);
  useEffect(() => {
   console.log("useEffect -reupload post")
    if(isFocused){
      setPOSTSDATA(POSTS)
      console.log("useEffect -reupload post")

   }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Header title={"Posts"}></Header>
      <ScrollView>
        {POSTSDATA.map((element, index) => (
          <Post navigation={navigation} post={element} key={index} ></Post>
        ))}
      </ScrollView>
    </View>
  )
}

export default signin

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})