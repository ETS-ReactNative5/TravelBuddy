
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button,onChangeText } from 'react-native-elements';
import {
  View,
   TouchableOpacity, Animated, Text, Image, FlatList, StyleSheet, Dimensions,KeyboardAvoidingView,ScrollView
} from "react-native";
import { color, Value } from "react-native-reanimated";
import { auth } from "../../../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioForm, {RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {db} from "../../../firebase-config"
import {collection,doc,getDocs,addDoc,setDoc,updateDoc,query,deleteDoc,where} from "firebase/firestore"
import { RadioButton } from 'react-native-paper';




var keyboardH=0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH= -400
}



export default function Register({ route,navigation }) {

 const userCollectionRef = collection(db,"user");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
   const { userId } = route.params;
   const [checked, setChecked] = React.useState('first');

//   console.log("Params:"+userId)

  
  var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
  ];

//   useEffect(()=>{
//       readUser()
      
//   },[])

//   async function readUser() {
//     const user = await AsyncStorage.getItem('uid')
//     if (user) {
//     //  setUser(JSON.parse(user))
//       console.log("User id :"+user)
//     }
//   }

const registerFtn = () =>{
    const addeUser = async() =>{
        //const dat = doc(db,"user","3Z18RxRIrC3gCpQ0JS9K")
        console.log("1212+"+gender)
        await addDoc(userCollectionRef, {
        userId:userId,
          name: name,
          age: age,
          sex: gender,
          address: address,
          contact:contact,
        });
  
       }
       addeUser()
       navigation.navigate('/')
}

function setValue (val) {
    if(val == 1) {
        setGender("Female")
    } else {
        setGender("Male")
    }
    // console.log("Gender:"+gender)
}


return (
  <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset = {keyboardH}> 
  <ScrollView style={{backgroundColor:'white'}}>
  <View>
    <View style={{
      backgroundColor:'#FFB6C1',
      position:'absolute',
      width:400,
      height:400,
      borderRadius:200,
      right:-100,
      top:-200,
    }}></View>
    <View style={{
      backgroundColor:'#F08080',
      position:'absolute',
      width:200,
      height:200,
      borderRadius:100,
      left:-50,
      top:-50,
    }}></View>

    <View style={{paddingVertical:230,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:20,color:'grey',marginBottom:30}}>Need some Information</Text>

<Input
  placeholder='Enter your Name' 
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
  onChangeText={value=> setName(value)}
/>  
<Input
  placeholder='Enter your Age' 
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
  onChangeText={value=> setAge(value)}
/>
<RadioForm
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'#F08080'}
          selectedButtonColor={'#F08080'}
          onPress={(value) => {setValue(value)}}
        />  

{/* <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      /> */}


<Input
  placeholder='Enter your Address' 
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
  onChangeText={value=> setAddress(value)}
/>

<Input
  placeholder='Enter your Contact Number' 
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }
  onChangeText={value=> setContact(value)}
/>

       <TouchableOpacity style={styles.loginBtn} onPress={registerFtn}>
         <Text>Confirm</Text>
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
    backgroundColor: "#F08080",

  },
})
