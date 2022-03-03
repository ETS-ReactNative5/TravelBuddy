import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button, } from 'react-native-elements';
import {
  View,
   TouchableOpacity, Animated, Text, Image, StyleSheet, KeyboardAvoidingView,ScrollView
} from "react-native";
import { SafeAreaView,FlatList } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { Ionicons } from '@expo/vector-icons'; 
import { Dimensions } from 'react-native';

var keyboardH=0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH= -400
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
                    marginRight:25,
                    marginBottom:15,
                }}
                />
    <Text style={styles.title}>{title}</Text>
    <Ionicons name="add" size={28} color="#6c63ff" style={{position:'absolute',marginHorizontal:300}} />
    </View>
    <View style={{flexDirection:'row'}}>
    <Text style={styles.title1}>Location: Muree</Text>
    <Text style={styles.title1}>Response Time: 30 Mins</Text>
    </View>
  </View>
);




export default function S3({ navigation }) {

  const renderItem = ({ item }) => <Item title={item.title} />;


  return ( 

  <SafeAreaView style={styles.container}>
    <SearchBar
  fontColor="#c6c6c6"
  iconColor="#c6c6c6"
  placeholder="Find Travel Guides"
  style={{marginTop:30}}
/>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}
      style={{marginTop:20}}
      />
    </SafeAreaView>

)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth:0.5,
    borderColor:'#6c63ff',
  },
  title: {
    fontSize: 20,
    marginTop:5
  },
  title1: {
    fontSize: 14,
    marginLeft:20
  },
  title2: {
    fontSize: 14,
    marginLeft:10
  },
})




