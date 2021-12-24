import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, } from 'react-native-elements';
import {
  View,
  TouchableOpacity, Animated, Text, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView
} from "react-native";
import { auth } from "../../../firebase";
import { useIsFocused } from "@react-navigation/native";

var keyboardH = 0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH = -400
}


export default function SignIn({ navigation }) {
  const isFocused = useIsFocused(); //for update of state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [uid, setUserId] = useState("");

  const nav = () => {
    console.log(uid)
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('drawer', {
          userId: email
        })
      }
    })
    return unsubscribe
  }


  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        //console.log('Logged in with : '+user.email)
        setUserId(user.email)
        //  console.log(uid)
        nav()
      })
      .catch(error => alert(error.message))

  }

  useEffect(() => {
    setEmail("")
    setPassword("")
    setUserId("")
    if (isFocused) {
      setEmail("")
      setPassword("")
      setUserId("")
    }
  }, [isFocused])



  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardH}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View>
          <View style={{
            backgroundColor: '#F08080',
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: 200,
            right: -100,
            top: -200,
          }}></View>
          <View style={{
            backgroundColor: '#FFB6C1',
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: 100,
            left: -50,
            top: -50,
          }}></View>

          <View style={{ paddingVertical: 220, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'grey', marginBottom: 60 }}>Welcome to Travel Mate</Text>

            <Input
              placeholder='Enter your Email'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color='black'
                />
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
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry={true} />


            <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
              <Text>Sign In</Text>
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
    width: "40%",
    borderRadius: 45,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#F08080",

  },
})




