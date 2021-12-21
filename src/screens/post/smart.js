import React, { useEffect, useState } from "react";
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'
import { auth } from "../../../firebase";
import {db} from "../../../firebase-config"
import {collection,doc,documentId,getDocs,addDoc,setDoc,updateDoc,query,deleteDoc,where, Firestore} from "firebase/firestore"
import { createIconSetFromFontello } from "@expo/vector-icons";

faker.seed(5);


function getUnique(array){
    var uniqueArray = [];
    
    // Loop through array values
    for(var i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
  }


  function arrayToObject(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; ++i){
        obj[i] = arr[i];
    }
    return obj;
}


const DATA = [...Array(10).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
    location: 'Muree',
    budget: "10000",
    days: "3",
    status: 'individual',
    uid: "saqib@test.com"
  };
});

const SPACING = 20;
const AVATAR_SIZE = 50;


export default function Smart({route,navigation}){


    const postCollectionRef = collection(db,"post");
    const [location,setLocation] = useState([])
    const [user,setUser] = useState([])

    useEffect(()=>{

        const getPost = async () => {
            // var id;
            const data = await getDocs(postCollectionRef);
            // console.log(data1.data())
            setUser(data.docs.map((doc) => (
              {
                ...doc.data(),
                id: doc.id
              })))

              for (var i =0 ;i<user.length;i++) {
                location.push(user[i].location)
               }
      
          }
      
          //console.log(user[0].id)

        var uniqueLocation = getUnique(location);
        console.log(uniqueLocation);

       var locationNew=arrayToObject(uniqueLocation);

        setLocation(locationNew)
      
          getPost()
      
        }, [])


        // for (var i =0 ;i<location.length;i++){
        //     console.log(location[i])
        // }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          padding: SPACING
        }}


        renderItem={({ item, index }) => {
          return <View style={{
            flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'lightgrey',
            borderRadius: 26, shadowColor: 'lightgrey', shadowOffset: {
              width: 0, height: 20
            },
            shadowOpacity: .5, shadowRadius: 10
          }}>
            
            <View style={{marginLeft:60,height:100}}>
              <Text></Text>
              <Text style={{ fontSize: 22, opacity: .7 }}>Location :{" "}</Text>
              <View style={{ flexDirection: 'row' }}>
              <Text style={{marginTop:25,fontSize:18}}>Posts : 5</Text>
                <TouchableOpacity style={styles.loginBtn1}>
                  <Text>View Posts</Text>
                </TouchableOpacity>
              </View>
            </View>


          </View>
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    display: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0.2,0.2)',
      width: "70%",
      height: '45%',
      borderRadius: 8,
      color: 'black',
      fontSize: 20,
      paddingLeft: 40,
      backgroundColor: "#FFB6C1",
    },
    loginBtn: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0.2,0.2)',
      width: "30%",
      borderRadius: 45,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: "#F08080",
  
    },
    loginBtn1: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0.2,0.2)',
      width: "50%",
      borderRadius: 45,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 40,
      marginTop: 20,
      backgroundColor: "#F08080",
  
    }
  });