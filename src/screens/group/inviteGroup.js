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


export default function InviteG({ route, navigation }) {

    const { userId,toId } = route.params;

    console.log("Created Groups---"+userId)

  const groupCollectionRef = collection(db, "groups");
  const inviteCollectionRef = collection(db, "invite");
  const [location, setLocation] = useState([])
  const [user, setUser] = useState([])
  const [gid, setGid] = useState("")

  useEffect(() => {

      const addGroup = async() =>{
        const q = query(groupCollectionRef,where("uid", "==",userId));
        let intermediateList=[];
         const getResult = await getDocs(q)
         getResult.forEach((doc) => {
          console.log(doc.data())
          setGid(doc.data().groupId)
          intermediateList.push({
            "data":doc.data(),
            "id": doc.id
          })
        });
        setUser(intermediateList)
       }

       

        addGroup()


  }, [])

  function send() {
      console.log(gid)
    const sendInvitation = async () =>{  
        await addDoc(inviteCollectionRef, {
          groupId:gid,
          fromId:userId,
          toId:toId
        });
    }
    sendInvitation().then(()=>{
        navigation.navigate('home')
    })
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

<Text style={{fontSize:30,color:'grey',marginTop:200,marginLeft:80,alignItems:'center',justifyContent:'center'}}>Invite to a Group</Text>

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
            <View style={{ marginLeft: 10, height: 55}}>
              <Text style={{ fontSize: 22, opacity: .7 }}>Group Name :{" "}{item.data.group_name}</Text>
              <TouchableOpacity style={styles.loginBtn} onPress={send}>
                  <Text>Invite</Text>
                </TouchableOpacity>
            </View>
            

          </View>
          
        }}
      />
        <TouchableOpacity style={styles.loginBtn1} onPress={() => navigation.navigate('invite_create')}>
         <Text>Create</Text>
       </TouchableOpacity>
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
    marginLeft:90,
    backgroundColor: "#F08080",

  },
  loginBtn1: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0.2,0.2)',
    width: "25%",
    borderRadius: 45,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop:5,
    marginBottom:30,
    marginLeft:120,
    backgroundColor: "#F08080",

  }
});