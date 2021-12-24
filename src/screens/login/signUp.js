
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, onChangeText } from 'react-native-elements';
import {
  View,
  TouchableOpacity, Animated, Text, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView
} from "react-native";
import { color, Value } from "react-native-reanimated";
import { auth } from "../../../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';




var keyboardH = 0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH = -400
}



export default function SignUp({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [uid, setUserId] = useState("");

  const handleSignUp = () => {

    if (confirmpassword != password) {
      setStatus("Confirm Password should be Same")
    } else {

      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log(user.email)
          // handle(user.emai)
          navigation.navigate('reg', {
            userId: user.email
          })
          // setUs(user)
          //console.log("Stored in async :"+uid)
        })
        .catch(error => alert(error.message))
    }
  }

  // async function handle(user) {
  //   await AsyncStorage.setItem('uid',JSON.stringify(user))
  //   console.log(u)
  // }


  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardH}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View>
          <View style={{
            backgroundColor: '#FFB6C1',
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: 200,
            right: -100,
            top: -200,
          }}></View>
          <View style={{
            backgroundColor: '#F08080',
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: 100,
            left: -50,
            top: -50,
          }}></View>

          <View style={{ paddingVertical: 230, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: 'grey', marginBottom: 60 }}>Register Yourself as Travel Mate</Text>

            <Input
              placeholder='Enter your Email'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color='black'
                />
              }
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
              onChangeText={value => setConfirmPassword(value)}
              secureTextEntry={true} />

            <Text style={{ color: 'red' }}>{status}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
              <Text>Register</Text>
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
