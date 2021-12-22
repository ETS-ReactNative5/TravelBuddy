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


export default function Post({ route,navigation }) {


    const { userId } = route.params;
    console.log("Params in Post Screen:" + userId)

    const postCollectionRef = collection(db,"post");

  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [descr, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [days, setDays] = useState(0);


  const add = () =>{
      console.log(location)
      console.log(days)
      console.log(budget)
      console.log(descr)

      const addePost = async() =>{
        //const dat = doc(db,"user","3Z18RxRIrC3gCpQ0JS9K")
        await addDoc(postCollectionRef, {
          location: location,
          days: days,
          uid: userId,
          budget:budget,
          description:descr,
          postTime: Timestamp.now(),
          comments:[
            {
            comment_text:"",
            uid:""
          }
        ]
        });
  
       }

       addePost()

       navigation.navigate('home')

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
    <Text style={{fontSize:30,color:'grey',marginBottom:60,marginLeft:100}}>Create Post</Text>

<Input
  placeholder='Enter your Location' 
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
  onChangeText={value=> setLocation(value)}
/>  
<View style={styles.container}>
                     <Slider min={0} max={50000} step={20}
                        valueOnChange={value => setBudget(value)}
                         initialValue={12}
                         knobColor='grey'
                         valueLabelsBackgroundColor='black'
                         inRangeBarColor='#F08080'
                          outOfRangeBarColor='#FFB6C1'
                    />
                     <Text>Budgtet:  {budget}</Text>
                </View> 

                <View style={styles.container}>
                     <Slider min={0} max={10} step={1}
                          valueOnChange={value => setDays(value)}
                         initialValue={12}
                         knobColor='grey'
                         valueLabelsBackgroundColor='black'
                         inRangeBarColor='#F08080'
                          outOfRangeBarColor='#FFB6C1'
                    />
                     <Text>Days:  {days}</Text>
                </View> 
        
         <TextInput style={{    height: 100,margin: 12,borderWidth: 2,padding: 10,borderColor:'#FFB6C1'}}
        placeholder="Post Description"
        onChangeText={value=> setDescription(value)}
      />


       <TouchableOpacity style={styles.loginBtn} onPress={add}>
         <Text>Add Post</Text>
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
    borderRadius:45,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#F08080",

  },
})




