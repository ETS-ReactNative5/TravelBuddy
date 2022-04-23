import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, ScrollView,  Image, FlatList, Dimensions,
} from "react-native";
//external dependancies
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import { SignInWithFirebase,PasswordResetFirebaseUser } from "../../firebase/authentication";
// import { onAuthStateChanged } from "firebase/auth";
// import { authUpdate } from "../../firebase/firebase-config";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
// import { StatusBar } from "expo-status-bar";


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

  const validate = (text) => {
    console.log(text.length)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    console.log(text, reg.test(text));      //working till @gmail.c else on .co its not working
    if(reg.test(text)==true){
      Alert.alert("Incorrect Email Address")
    }else {
      SignInWithFirebase(email, password);
    }
  }

  // onAuthStateChanged(authUpdate, (user) => {
  //   if (user) {
  //     console.log("uid of user is:",user.uid)
  //     navigation.navigate('deleteit')
  //   } else {
  //     console.log("user is signout from observer of user2")
  //   }
  // });

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardH}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View>
          <View style={{
            backgroundColor: '#6c63ff',
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: 200,
            right: -100,
            top: -200,
          }}></View>
          <View style={{
            backgroundColor: '#e5e5e5',
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: 100,
            left: -50,
            top: -50,
          }}></View>

          <View style={{ paddingVertical: 220, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: '#3f3d56', marginBottom: 60, fontWeight: 'bold' }}>SIGN IN</Text>

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

            <TouchableOpacity style={styles.loginBtn} onPress={()=>validate(email)}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e5e5e5' }}>Sign In</Text>
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
    backgroundColor: "#6c63ff",

  },
})




