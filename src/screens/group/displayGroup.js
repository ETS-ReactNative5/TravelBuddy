import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button, } from 'react-native-elements';
import {
  View,
   TouchableOpacity,TextInput , Animated, Text, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView,ScrollView
} from "react-native";
import { auth } from "../../../firebase";
import {db} from "../../../firebase-config"
import {collection,doc,documentId,getDocs,addDoc,setDoc,updateDoc,query,deleteDoc,where, Firestore} from "firebase/firestore"
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import { Timestamp } from 'firebase/firestore';

var keyboardH=0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH= -400
}


export default function DisplayGroup({ route,navigation }) {


    const { userId } = route.params;
    console.log("Params in Create Group Screen:" + userId)

    const groupCollectionRef = collection(db,"groups");

  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [descr, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [days, setDays] = useState(0);
  const [groupname, setGname] = useState("");
  const [groupList, setGroupList] = useState([]);


  const created = () =>{
        navigation.navigate('display_created',{
            userId:userId
        })
  }



return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset = {keyboardH}> 
    <ScrollView style={{backgroundColor:'white'}}>
  <View>
    <View style={{
      backgroundColor:'#F08080',
      position:'absolute',
      width:400,
      height:400,
      borderRadius:200,
      right:-100,
      top:-200,
    }}></View>
    <View style={{
      backgroundColor:'#FFB6C1',
      position:'absolute',
      width:200,
      height:200,
      borderRadius:100,
      left:-50,
      top:-50,
    }}></View>

    <View style={{paddingVertical:220}}>
    <Text style={{fontSize:30,color:'grey',marginBottom:10,marginLeft:80}}>Groups Information</Text>

       <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('create_group')}>
         <Text>Create</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.loginBtn} onPress={created}>
         <Text>Groups Created</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.loginBtn} >
         <Text>Joined Groups</Text>
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
    padding:20
  },
  loginBtn: {
    borderWidth:1,
    marginLeft:100,
    borderColor:'rgba(0,0,0.2,0.2)',
    width: "40%",
    borderRadius:85,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#F08080",

  },
  loginBtn1: {
    borderWidth:1,
    marginLeft:100,
    borderColor:'rgba(0,0,0.2,0.2)',
    width: "40%",
    borderRadius:85,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#ea3c53",

  },
})




