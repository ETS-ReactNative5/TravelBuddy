import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, FlatList, Dimensions,
} from "react-native";
//external dependancies
import { onAuthStateChanged } from "firebase/auth";
import { Swing } from "react-native-animated-spinkit";
import { authUpdate } from "../../firebase/firebase-config";
import { PasswordResetFirebaseUser, LogoutUser } from "../../firebase/authentication";
import { Controller } from "../../BLogic/Controller";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
// import { StatusBar } from "expo-status-bar";


var keyboardH = 0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH = -400
}


export default function AuthLoader({ navigation }) {

  useEffect(async () => {
    const obj = new Controller();
    let _email = { uid: authUpdate.currentUser.uid, email: authUpdate.currentUser.email }
    let response = await obj.makeRegisteration(_email)
    if (response) {//if true -->registeration successful.
      navigation.navigate("completeProfile");
    } else if (!response) {//if false --> registeratin not done because of already registered account.
      //make check for is registeration complete or not. then navigate accordingly.
      let response=await obj.checkProfileCompleteness(_email.uid)
      if(response) navigation.navigate("home")
      else navigation.navigate("completeProfile")
      console.log("user is already have identity")
    } else {//error,return to inital state.
      LogoutUser();
      navigation.navigate("main")
    }
  }, [])
  //   onAuthStateChanged(authUpdate, (user) => {
  //     if (user) {
  //       console.log("uid of user is:",user.uid)
  //       navigation.navigate('deleteit')
  //     } else {
  //       console.log("user is signout from observer of user2")
  //     }
  //   });


  return (
    <View style={styles.container}>
      <Swing size={48} color="#6c63ff" />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
})




