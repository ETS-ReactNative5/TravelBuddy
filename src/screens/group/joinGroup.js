import React, { useEffect, useState } from "react";
import { Button, _Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'
import { auth } from "../../../firebase";
import { db } from "../../../firebase-config"
import { collection, doc, documentId, getDocs, addDoc, setDoc, updateDoc, query, deleteDoc, where, Firestore } from "firebase/firestore"
import { createIconSetFromFontello } from "@expo/vector-icons";

faker.seed(5);


function getUnique(array) {
  var uniqueArray = [];

  // Loop through array values
  for (var i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}


function arrayToObject(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; ++i) {
    obj[i] = arr[i];
  }
  return obj;
}


// const DATA = [...Array(10).keys()].map((_, i) => {
//   return {
//     key: faker.random.uuid(),
//     image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
//     name: faker.name.findName(),
//     jobTitle: faker.name.jobTitle(),
//     email: faker.internet.email(),
//     location: 'Muree',
//     budget: "10000",
//     days: "3",
//     status: 'individual',
//     uid: "saqib@test.com"
//   };
// });

const SPACING = 20;
const AVATAR_SIZE = 50;


export default function JoinG({ route, navigation }) {

    const { userId } = route.params;

    console.log("Joined Groups---"+userId)

  const groupCollectionRef = collection(db, "groups");
  const [location, setLocation] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {

      const addGroup = async() =>{
        const q = query(groupCollectionRef)
        let intermediateList=[];
         const getResult = await getDocs(q)
         getResult.forEach((doc) => {
          console.log(doc.data())
            for (var i =0;i<doc.data().users.length;i++) {
            if (doc.data().users[i] == userId && doc.data().uid != userId) {
             //console.log("joined Groups")
            intermediateList.push({
            "data":doc.data(),
            "id": doc.id
          })
          //.log(doc.data())
            }
          }

        });
        setUser(intermediateList)
       }

       

        addGroup()


  }, [])

 
  for (var i =0;i<user.length;i++) {
    console.log(user[i])  
}



  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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

<Text style={{fontSize:30,color:'grey',marginTop:200,marginLeft:80,alignItems:'center',justifyContent:'center'}}>Groups Joined</Text>

      <FlatList
        data={user}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: SPACING,
          marginTop:10
        }}


        renderItem={({ item, index }) => {
          return <View style={{
            flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'lightgrey',
            borderRadius: 26, shadowColor: 'lightgrey', shadowOffset: {
              width: 0, height: 50
            },
            shadowOpacity: .5, shadowRadius: 10
          }}>
            <View style={{ marginLeft: 60, height: 40}}>
              <Text style={{ fontSize: 22, opacity: .7 }}>Group Name :{item.data.group_name}</Text>
              {/* <View style={{ flexDirection: 'row' }}>
              {comments.map(value =>
                    <View style={styles.loginBtn1}>
                        <Text style={{fontSize:18,marginLeft:10,marginTop:5}}>{value.uid}{"  "}:</Text>
                        <Text style={{fontSize:18,marginLeft:10,marginTop:5}}>{value.comment_text}</Text>
                    </View>
                )}
              </View> */}
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