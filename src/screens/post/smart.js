import React, { useEffect, useState } from "react";
import { Button } from 'react-native';
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


export default function Smart({ route, navigation }) {


  const postCollectionRef = collection(db, "post");
  const [location, setLocation] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    let tempLocation = []
    const MyEffect = async () => {

      const getPost = async () => {
        //console.log("\ncalling post")
        const data = await getDocs(query(postCollectionRef));
        
        //added to delay irrelvant
        const Myf1=async ()=>{setUser(data.docs.map(
          (doc) => ({
            ...doc.data(),
            id: doc.id
          })))}
        await Myf1();
        //console.log("asdad")
        let r1=await Myf1();//added to delay irrelvant
        
        // console.log("myData:",user[0])
        // console.log("calling then in setUser")
        
        //console.log("mylength:",data.docs.length)
        for (let i = 0; i < data.docs.length; i++) {
        //  console.log("location",data.docs[i].data().location)
          tempLocation.push(data.docs[i].data().location)
        }
        setLocation(tempLocation)




      }

      await getPost()
     // console.log("Caling then in getPOst:",location)
      let uniqueLocation = getUnique(tempLocation);
   //   console.log("checking list:", uniqueLocation);

      // let locationNew = arrayToObject(uniqueLocation);
      let locationNew=[]
      const myTemp=async ()=>{
        for(let i=0;i<uniqueLocation.length;i++){
          locationNew.push({"location":uniqueLocation[i],"id":uniqueLocation[i]})
        }
      }
      let temp=await myTemp();
      setLocation(locationNew)
//      console.log("result",locationNew)

    }

    MyEffect();


  }, [])


  // for (var i =0 ;i<location.length;i++){
  //     console.log(location[i])
  // }
  function ViewP(location){
    navigation.navigate('smart_post',{
      loc:location
    })
    // const getP = async () =>{
    //  const q = query(postCollectionRef, where("location", "==",loc));
    //    // console.log(post[0])
    //     const getResult = await getDocs(q)
    //     getResult.forEach((doc) => {
    //       console.log(doc.id);
    //       console.log(doc.data());
    //     });
    //   }
    //   getP()
}



  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={location}
        keyExtractor={item => item.id}
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

            <View style={{ marginLeft: 60, height: 100 }}>
              <Text></Text>
              <Text style={{ fontSize: 22, opacity: .7 }}>Location :{item.location}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 25, fontSize: 18 }}>Posts : 5</Text>
                <TouchableOpacity style={styles.loginBtn1} onPress={()=>{ViewP(item.location)}}>
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