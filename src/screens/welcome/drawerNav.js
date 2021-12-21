import React, { useEffect, useState } from "react";
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomSide from './custom';
import SignIn from '../login/signIn';
import AddButton from './addButton';
import ViewProfile from '../profile/viewProfile';
import UpdateProfile from '../profile/updateProfile';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'
import Post from '../post/post';
import { auth } from "../../../firebase";
import {db} from "../../../firebase-config"
import {collection,doc,documentId,getDocs,addDoc,setDoc,updateDoc,query,deleteDoc,where,orderBy} from "firebase/firestore"


faker.seed(10);




const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
    location: 'Muree',
    budget:"10000",
    days:"3",
    status:'individual',
    uid:"saqib@test.com"
  };
});

const SPACING = 20;
const AVATAR_SIZE = 50;


function HomeScreen({ route, navigation }) {

  const { userId } = route.params;
  console.log("Params in Home:" + userId)
  const postCollectionRef = collection(db,"post");
  const [user,setUser] = useState([])


  useEffect(()=>{
    const getPost = async () =>{
      // var id;
       const data = await getDocs(postCollectionRef);
      // console.log(data1.data())
        setUser(data.docs.map((doc)=>({...doc.data(),
          id:doc.id})))
          //console.log(user[0])
        //console.log(user[0].comments)
      //   console.log(id)
      //   setComments(user[0].comments)
      //   console.log(comments)
        // for (var i =0 ;i<user.length;i++) {
        //  console.log(user[i])
        // }

        //console.log(user)
      
        }
  
  getPost()
  
  },[])
  
  user.sort(function(x, y){
    return y.postTime - x.postTime;
})

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={user}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          padding:SPACING
        }}
        renderItem={({ item, index }) => {
          return <View style={{flexDirection:'row',padding:SPACING,marginBottom:SPACING,backgroundColor:'lightgrey',
          borderRadius:16,shadowColor:'lightgrey',shadowOffset:{
            width:0,height:10
          },
          shadowOpacity:.5,shadowRadius:20
          }}>
            <Image
              source={require("../../images/man.png")}
              style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,
                marginRight:SPACING/2
              }}
            />
          
            <View>
              <Text style={{fontSize:22,fontWeight:'600'}}>{item.name}</Text>
              <Text style={{fontSize:18,opacity:.7}}>Going to :{" "}{item.location}</Text>
              <Text style={{fontSize:18,opacity:.7}}>Trip Budget:{" "}{item.budget}</Text>
              <Text style={{fontSize:18,opacity:.7}}>Trip Days:{" "}{item.days}</Text>
              <Text style={{fontSize:20,opacity:.8,color:'#F08080'}}>{item.description}</Text>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={styles.loginBtn}>
         <Text>Invite</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.loginBtn1}>
         <Text>Comment</Text>
       </TouchableOpacity>
       </View>
            </View>
            

          </View>
        }}
      />
      <View style={{position:'relative',marginLeft:180,paddingTop:10}}>
      <AddButton />
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function drawNavg({ route, navigation }) {
  const { userId } = route.params;
  console.log("Params in main:" + userId)
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomSide {...props} />}
    // initialParams={{userId}}
    >
      <Drawer.Screen name="home" component={HomeScreen} initialParams={{ userId }} />
      <Drawer.Screen name="profile" component={ViewProfile} initialParams={{ userId }} />
      <Drawer.Screen name="update_profile" component={UpdateProfile} initialParams={{ userId }} />
      <Drawer.Screen name="post" component={Post} initialParams={{ userId }} />
    </Drawer.Navigator>
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
    borderWidth:1,
    borderColor:'rgba(0,0,0.2,0.2)',
    width: "30%",
    borderRadius:45,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#F08080",

  },
  loginBtn1: {
    borderWidth:1,
    borderColor:'rgba(0,0,0.2,0.2)',
    width: "30%",
    borderRadius:45,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:50,
    marginTop: 20,
    backgroundColor: "#F08080",

  }
});