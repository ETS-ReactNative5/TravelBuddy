// import { StatusBar } from "expo-status-bar";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import {
  View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Animated, FlatList, Image, Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
//external dependancies
import { Input, Button, } from 'react-native-elements';
import { Zocial } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { authUpdate } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { RegisterUserInFirebase } from "../../firebase/authentication";

var keyboardH = 0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH = -400
}

/**
 * first ever screen to register identity of new user to the application -(take email and password)
 */
export default function SignUp({ navigation }) {
  const isFocused = useIsFocused(); //for update of state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // onAuthStateChanged(authUpdate, (user) => {
  //   if (user) {
  //     console.log("uid of user is:",user.uid)
  //     navigation.navigate('deleteit')
  //   } else {
  //     console.log("user is signout from observer of user")
  //   }
  // });

  useEffect(() => {
    setEmail("")
    setPassword("")
    if (isFocused) {
      setEmail("")
      setPassword("")
    }
  }, [isFocused])


  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardH}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View>
          <View style={{
            backgroundColor: '#e5e5e5',
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: 200,
            right: -100,
            top: -200,
          }}></View>
          <View style={{
            backgroundColor: '#6c63ff',
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: 100,
            left: -50,
            top: -50,
          }}></View>

          <View style={{ paddingVertical: 220, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: '#3f3d56', marginBottom: 30, fontWeight: 'bold' }}>SIGN UP</Text>

            <Input
              placeholder='Email Address'
              leftIcon={
                <Zocial name="email" size={24} color="black" />
              }
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <Input placeholder="Password"
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color='black'
                />
              }
              onChangeText={value => setPassword(value)}
              secureTextEntry={true} />
            <Input placeholder="Confirm Password"
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color='black'
                />
              }
              secureTextEntry={true} />


            <TouchableOpacity style={styles.loginBtn} onPress={() => {RegisterUserInFirebase(email,password)}}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e5e5e5' }}>SIGN UP</Text>
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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0.2,0.2)',
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#6c63ff",

  },
})




