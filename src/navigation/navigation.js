import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "../screens/Main/main";
import SignIn from "../screens/login/signIn";
import SignUp from "../screens/login/signUp";
import Register from "../screens/login/reg";
import Main from "../screens/Main/main";
import drawNavg from "../screens/welcome/drawerNav";
import AddButton from "../screens/welcome/addButton";
import HomeScreen from "../screens/welcome/drawerNav";
import Post from "../screens/post/post";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (
      <NavigationContainer independent={true}>
      <Stack.Navigator   screenOptions={{
    headerShown: false,
    contentStyle:{
      backgroundColor:'#FFFFFF'
    }
  }}
  >
        
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="/" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="drawer" component={drawNavg} />
        <Stack.Screen name="addbtn" component={AddButton} />
        <Stack.Screen name="reg" component={Register} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="post" component={Post} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
};
