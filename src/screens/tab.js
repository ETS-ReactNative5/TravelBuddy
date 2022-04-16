import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import S1 from './s1';
import S2 from './s2';
import S3 from './s3';
import S4 from './s4';
import { Entypo,FontAwesome,Feather,MaterialIcons ,AntDesign,Ionicons } from '@expo/vector-icons'; 
import {
    View,
     TouchableOpacity,Text, Button,Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView,ScrollView
  } from "react-native";
  import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();


export default function Tabs() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          activeTintColor: '#6c63ff',
        }}
            screenOptions={
        {
        tabBarStyle:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        elevation:0,
        borderRadius:5,
        height:60,
        }
        }
    }
        >
        <Tab.Screen
          name="Home"
          component={S1}
          options={{
            tabBarLabel: 'Home',
            headerShown:false,
            headerTitleStyle:{
              fontSize:20
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color="#3f3d56"
                size={size}
              />
            ),
          }}  />
        <Tab.Screen
          name="Search"
          component={S2}
          options={{
            tabBarLabel: 'Search',
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
<AntDesign name="search1" size={24} color="#3f3d56" />
            ),
          }} />
               <Tab.Screen
          name="add"
          component={S2}
          options={{
            tabBarLabel: 'Post',
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={50} color="#6c63ff" />
            ),
          }} />
                            <Tab.Screen
          name="Groups"
          component={S4}
          options={{
            tabBarLabel: 'Groups',
            headerStyle:{
              backgroundColor:'#6c63ff',
            },        headerTitleStyle: {
              fontWeight: 'bold',
              color:'#e5e5e5'
            },
            headerRight: () => (
              <MaterialIcons name="group-add" size={30} color="#e5e5e5"
              style={{marginRight:10}}
              />
            ),
            tabBarIcon: ({ color, size }) => (
<FontAwesome name="group" size={24} color="#3f3d56" />
            ),
          }} /> 
                  <Tab.Screen
          name="Search11"
          component={S3}
          options={{
            tabBarLabel: 'Find',
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
<AntDesign name="find" size={24} color="#3f3d56" />
            ),
          }} />

      </Tab.Navigator>
  );
}


  
  ///tabBarBadge: 3 
  
  