import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/main";
import SignIn from "../screens/signin";
import SignUp from "../screens/signup";
import Home from "../screens/home";
import ViewP from "../screens/viewP";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {    //this component is managaing routes between multiple screens
  
  return (
      <NavigationContainer independent={true}>
      <Stack.Navigator   screenOptions={{
    headerShown: false,
    contentStyle:{
      backgroundColor:'#FFFFFF'
    }
  }}
  >
        
        <Stack.Screen name="main" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="login" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="register" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={ViewP} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};
