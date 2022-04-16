import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button, } from 'react-native-elements';
import {
  View,
   TouchableOpacity,Text, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView,ScrollView
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";



var keyboardH=0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH= -400
}


export default function S2({ navigation }) {



  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset = {keyboardH}> 
  <ScrollView >
<View>
<View>
<SearchBar
  fontColor="#c6c6c6"
  iconColor="#c6c6c6"
  placeholder="Search Posts by tags"
  style={{marginTop:30}}
/>
      </View>
  <View style={{paddingVertical:220,justifyContent:'center',alignItems:'center'}}>
  <Text style={{fontSize:30,color:'#3f3d56',marginBottom:10,fontWeight:'bold'}}>Welcome to S2</Text>
  

  </View>

 </View>
 </ScrollView>
 </KeyboardAvoidingView>
)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0.2,0.2)',
    width: "40%",
    borderRadius:45,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#6c63ff",

  },
})




