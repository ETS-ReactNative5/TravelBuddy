import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button, } from 'react-native-elements';
import {
  View,
   TouchableOpacity, Animated, Text,TextInput, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView,ScrollView
} from "react-native";


var keyboardH=0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH= -400
}


export default function SignUp({ navigation }) {


return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset = {keyboardH}> 
    <ScrollView style={{backgroundColor:'white'}}>
  <View>
    <View style={{
      backgroundColor:'#e5e5e5',
      position:'absolute',
      width:400,
      height:400,
      borderRadius:200,
      right:-100,
      top:-200,
    }}></View>
    <View style={{
      backgroundColor:'#6c63ff',
      position:'absolute',
      width:200,
      height:200,
      borderRadius:100,
      left:-50,
      top:-50,
    }}></View>

    <View style={{paddingVertical:220,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30,color:'#3f3d56',marginBottom:30,fontWeight:'bold'}}>SIGN UP</Text>

<Input
  placeholder='Name' 
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
/>  
<Input
  placeholder='Email Address' 
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
/>  
<Input
  placeholder='Phone Number' 
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

<TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="PhoneNumber"
      />


       <TouchableOpacity style={styles.loginBtn}>
         <Text style={{fontWeight:'bold',fontSize:18,color:'#e5e5e5'}}>SIGN UP</Text>
       </TouchableOpacity>

    </View>

   </View>
   </ScrollView>
   </KeyboardAvoidingView>
)
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0.2,0.2)',
    width: "80%",
    borderRadius:5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#6c63ff",

  },
})




