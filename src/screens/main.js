import React, { Component } from 'react'
import { StyleSheet, View,TouchableOpacity,Text,KeyboardAvoidingView } from 'react-native'
import { Video } from 'expo-av'
import { Entypo,AntDesign } from '@expo/vector-icons'; 
import {signInWithGoogleAsync,signInWithFacebookAsync} from '../../firebase/authentication'
export default function LoginScreen({navigation}) {

    return (
      <View style={styles.container}> 

      <Video
      source={require('../assets/bv.mp4')}
      style={styles.backgroundVideo}
      rate={1}
      shouldPlay={true}
      isLooping={true}
      volume={1}
      muted={true}
      resizeMode="cover"
      />
      

      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={{flexDirection:'row',padding:90}}>
      <Text style={{alignItems:'center',justifyContent:'center',color:'#6c63ff',fontFamily:'Trebuchet MS',fontSize:40,fontWeight:'bold'}}>Travel</Text>
      <Text style={{alignItems:'center',justifyContent:'center',color:'#6c63ff',fontFamily:'Trebuchet MS',fontSize:40,fontWeight:'bold'}}>Buddy</Text>
      </View>
      <View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => signInWithFacebookAsync().then(() => console.log('Signed in with Facebook!'))}>
      <View style={{flexDirection:'row'}}>
      <Entypo name="facebook" size={24} color="blue" />
         <Text style={{padding:5}}>Continue with Facebook</Text>
         </View>
       </TouchableOpacity>
       <TouchableOpacity style={styles.loginBtn} onPress={() => signInWithGoogleAsync().then(() => console.log('Signed in with Google!'))}>
       <View style={{flexDirection:'row'}}>
       <AntDesign name="google" size={24} color="darkorange" />
         <Text style={{padding:5}}>Continue with Google</Text>
         </View>
       </TouchableOpacity>
       <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('signin')}>
         <Text>SignIn with Email</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{paddingTop:100,marginLeft:120}} onPress={() => navigation.navigate('signup')}  >
         <Text style={{color:'#e5e5e5',fontSize:20,fontWeight:'bold'}}>Create new account</Text>
       </TouchableOpacity>
       </View>
      </KeyboardAvoidingView>
      </View>
    );
  }

//#ff6583
//#6c63ff
//#2f2e41
//#3f3d56
//#e5e5e5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loginBtn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0.2,0.2)',
    width: "70%",
    borderRadius:45,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft:60,
    backgroundColor: "#e5e5e5",

  },
});