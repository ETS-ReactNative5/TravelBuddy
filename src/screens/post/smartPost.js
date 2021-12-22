import React, { useEffect, useState } from "react";
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'
import { auth } from "../../../firebase";
import { db } from "../../../firebase-config"
import { collection, doc, documentId, getDocs, addDoc, setDoc, updateDoc, query, deleteDoc, where, orderBy } from "firebase/firestore"


faker.seed(10);




const DATA = [...Array(30).keys()].map((_, i) => {
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


export default function SmartPost({ route, navigation }) {

  const { loc } = route.params;
  console.log("Params in Smart Post:" + loc)
  const postCollectionRef = collection(db, "post");
  const [user, setUser] = useState([])
 

  useEffect(() => {
    const getPost = async () => {
      // var id;
      const q = query(postCollectionRef, where("location", "==",loc));
       
       let intermediateList=[];
        const getResult = await getDocs(q)
        getResult.forEach((doc) => {
          intermediateList.push({
            "data":doc.data(),
            "id": doc.id
          })
        });
        setUser(intermediateList)

    }
    getPost()

  }, [])



  function comment(id){
    console.log("Post Id:"+id);
    navigation.navigate('comment',{
      postId:id
    })
  }


  function ViewP(id){
      navigation.navigate('report',{
          userId: userId,
          repId:id
      })
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={user}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: SPACING
        }}


        renderItem={({ item, index }) => {
          return <View style={{
            flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'lightgrey',
            borderRadius: 16, shadowColor: 'lightgrey', shadowOffset: {
              width: 0, height: 10
            },
            shadowOpacity: .5, shadowRadius: 20
          }}>
            <Image
              source={require("../../images/man.png")}
              style={{
                width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,
                marginRight: SPACING / 2,marginTop:30
              }}
            />

            <View>
            <TouchableOpacity onPress={(()=>ViewP(item.uid))}>
              <Text style={{ fontSize: 22, fontWeight: '600' }}>{item.uid}</Text>
              </TouchableOpacity>
              <Text></Text>
              <Text style={{ fontSize: 18, opacity: .7 }}>Going to :{" "}{item.data.location}</Text>
              <Text style={{ fontSize: 18, opacity: .7 }}>Trip Budget:{" "}{item.data.budget}</Text>
              <Text style={{ fontSize: 18, opacity: .7 }}>Trip Days:{" "}{item.data.days}</Text>
              <Text style={{ fontSize: 20, opacity: .8, color: '#F08080' }}>{item.data.description}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.loginBtn}>
                  <Text>Invite</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn1} onPress={(()=>comment(item.id))}>
                  <Text>Comments</Text>
                </TouchableOpacity>
              </View>
            </View>


          </View>
        }}
      />
    </View>
  );
}

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
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#F08080",

  },
  loginBtn1: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0.2,0.2)',
    width: "35%",
    borderRadius: 45,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
    marginTop: 20,
    backgroundColor: "#F08080",

  }
});