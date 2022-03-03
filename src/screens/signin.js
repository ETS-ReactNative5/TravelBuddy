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


var keyboardH=0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH= -400
}


export default function SignIn({ navigation }) {


return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset = {keyboardH}> 
    <ScrollView style={{backgroundColor:'white'}}>
  <View>
    <View style={{
      backgroundColor:'#6c63ff',
      position:'absolute',
      width:400,
      height:400,
      borderRadius:200,
      right:-100,
      top:-200,
    }}></View>
    <View style={{
      backgroundColor:'#e5e5e5',
      position:'absolute',
      width:200,
      height:200,
      borderRadius:100,
      left:-50,
      top:-50,
    }}></View>

    <View style={{paddingVertical:220,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30,color:'#3f3d56',marginBottom:60,fontWeight:'bold'}}>TravelBuddy</Text>

<Input
  placeholder='Enter your Email' 
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
/>  
<Input placeholder="Password"
  leftIcon={
    <Icon
      name='lock'
      size={24}
      color='black'
    />
  }
secureTextEntry={true} />


       <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('home')}>
         <Text style={{fontWeight:'bold',fontSize:18,color:'#e5e5e5'}}>Sign In</Text>
       </TouchableOpacity>

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




