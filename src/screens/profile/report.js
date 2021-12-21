
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button,onChangeText } from 'react-native-elements';
import {
  View,
   TouchableOpacity,TextInput,RefreshControl, Animated, Text, Image, FlatList, StyleSheet, Dimensions,KeyboardAvoidingView,ScrollView
} from "react-native";
import { color, Value } from "react-native-reanimated";
import { auth } from "../../../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioForm, {RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {db} from "../../../firebase-config"
import {collection,doc,getDocs,addDoc,setDoc,updateDoc,query,deleteDoc,where} from "firebase/firestore"
import { RadioButton } from 'react-native-paper';


const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

var keyboardH=0

if (Platform.OS === 'ios') {
  keyboardH = 10
} else {
  keyboardH= -400
}



export default function Report({ route,navigation }) {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

 const reportCollectionRef = collection(db,"reports");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [user,setUser] = useState([])
  const [descr, setDescription] = useState("");
   const [checked, setChecked] = React.useState('first');

   const { userId,repId } = route.params;
   console.log("Params in reportProfile userID:"+userId)
   console.log("Params in reportProfile repID:"+repId)

  
  var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
  ];


  const report = () =>{
    const addReport = async() =>{
      //const dat = doc(db,"user","3Z18RxRIrC3gCpQ0JS9K")
      //console.log("1212+"+gender)
      await addDoc(reportCollectionRef, {
      userId:userId,
      repId:repId,
      report_text:descr
      });

     }
     addReport()
     navigation.navigate('home')
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
    <Text style={{fontSize:20,color:'grey',marginBottom:30}}>Report Profile</Text>

            
    <TextInput style={{ width:"70%",height: 100,margin: 12,borderWidth: 2,padding: 10,borderColor:'#DC143C'}}
        placeholder="Report Description"
        onChangeText={value=> setDescription(value)}
      />

       <TouchableOpacity style={styles.loginBtn} onPress={report}>
         <Text>Submit Report</Text>
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
  display:{
    borderWidth:1,
    borderColor:'rgba(0,0,0.2,0.2)',
    width: "70%",
    height:'15%',
    borderRadius:8,
    color:'black',
    fontSize:20,
    marginTop:10,
    paddingLeft:40,
    paddingTop:5,
    backgroundColor: "#FFB6C1",
  },
    scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
