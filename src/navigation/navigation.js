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
import TabOneScreen from "../screens/welcome/modal";
import Smart from "../screens/post/smart";
import CommentScreen from "../screens/comment/comments";
import SmartPost from "../screens/post/smartPost";
import GroupCreate from "../screens/group/create";
import DisplayGroup from "../screens/group/displayGroup";
import CreatedG from "../screens/group/createdGroups";



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
        <Stack.Screen name="pop" component={TabOneScreen} />
        <Stack.Screen name="smart" component={Smart} />
        <Stack.Screen name="comment" component={CommentScreen} />
        <Stack.Screen name="smart_post" component={SmartPost} />
        <Stack.Screen name="create_group" component={GroupCreate} />
        <Stack.Screen name="display_group" component={DisplayGroup} />
        <Stack.Screen name="display_created" component={CreatedG} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
};
