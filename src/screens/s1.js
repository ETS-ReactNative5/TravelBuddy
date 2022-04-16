import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button, } from 'react-native-elements';
import {
  View,
   TouchableOpacity,Text, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView,ScrollView
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSide from './custom';
import S2 from "./s2";
import ViewP from "./viewP";
import { AntDesign } from '@expo/vector-icons'; 
import { SafeAreaView} from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { Ionicons,SimpleLineIcons,FontAwesome } from '@expo/vector-icons'; 


var keyboardH=0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH= -400
}
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'M.Zulkifal khan',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Nabeel Noor',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Saqib Zeb',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d12',
    title: 'Talha Gul',
  }
];


const Item = ({ title }) => (
  <View style={styles.item}>
    <View style={{flexDirection:'row'}}>
               <Image
               source={require("../assets/profile.jpeg")}
                style={{
                    height:40,
                    width:40,
                    borderRadius:50,
                    marginRight:10,
                }}
                />
    <Text style={styles.title}>{title}</Text>
    <SimpleLineIcons name="options-vertical" size={15} color="#6c63ff" 
    style={{position:'absolute',marginHorizontal:340}}
    />
    </View>
    <View style={{flexDirection:'row'}}>
    <Text style={styles.title1}>I'm going to Murree so anyone free.</Text>
    </View>
    <Image
               source={require("../assets/muree.jpg")}
                style={{
                  marginTop:10,
                    height:200,
                    width:320,
                    borderRadius:10,
                    marginLeft:20,
                }}
                />
                <View style={{flexDirection:'row'}}>
                <Text style={{marginLeft:230,marginTop:20}}>5 Comments</Text>
                <FontAwesome name="comments" size={24} color="#6c63ff"
                style={{marginLeft:10,marginTop:20}}
                />
                </View>
  </View>
);




const Drawer = createDrawerNavigator();


function S1({ navigation }) {


  const renderItem = ({ item }) => <Item title={item.title} />;


  return ( 

  <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}
      style={{marginTop:0}}
      />
    </SafeAreaView>

)
}


export default function drawNavg({ route, navigation }) {   //this component helps to navigate between screens in navbar
  //console.log("Params in main:" + userId)
  return (
    <Drawer.Navigator initialRouteName="S1" drawerContent={props => <CustomSide {...props}/>}
    // initialParams={{userId}}
    >
      <Drawer.Screen name="Post Feed" component={S1} 
      options={{
        headerStyle:{
          backgroundColor:'#6c63ff'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color:'#e5e5e5'
        },
        headerTintColor:'#e5e5e5',
      }}
      />
            <Drawer.Screen name="Profile" component={ViewP} 
      options={{
        headerStyle:{
          backgroundColor:'#6c63ff'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color:'#e5e5e5'
        },
        headerTintColor:'#e5e5e5',
        headerRight: () => (
          <AntDesign name="edit" size={24} color="#e5e5e5"
          style={{marginRight:10}}
          />
        ),
      }}
      />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:0,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth:0.5,
    borderColor:'#6c63ff',
  },
  title: {
    fontSize: 20,
    marginBottom:20
  },
  title1: {
    fontSize: 14,
    marginTop:-10,
    marginLeft:50
  },
  title2: {
    fontSize: 14,
    marginLeft:10
  },
})




