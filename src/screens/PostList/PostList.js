import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import {Post} from "../Post";
// import { getPost } from '../../Manager/BLogic'; //Post data
import { PersistanceHandler } from '../../../PersistanceHandler/Store';
import { Loader } from '../Loader/Loader';


export const PostList = ({ navigation }) => {
  const isFocused = useIsFocused();
const [POSTSDATA, setPOSTSDATA] = useState(null);
  useEffect(async () => {
   console.log("useEffect -reupload post")
    if(isFocused){
      let obj=new PersistanceHandler()
      setPOSTSDATA(await obj.getPost())
      console.log("useEffect -reupload post")

   }
  }, [isFocused]);

  if(POSTSDATA) return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={()=>navigation.navigate("createpost")}><Text>{"button"}</Text></TouchableOpacity> */}
      <ScrollView>
        {POSTSDATA.map((element, index) => (
          <Post navigation={navigation} post={element} key={index} ></Post>
        ))}
      </ScrollView>
    </View>
  )
  else return (
    <Loader></Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})