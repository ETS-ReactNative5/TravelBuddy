import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/main";
import SignIn from "../screens/signin";
import SignUp from "../screens/signup";
import RegisterInformation from "../screens/registerinformation";



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
        
        <Stack.Screen name="/" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="signin" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="signup" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="registerinfo" component={RegisterInformation} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};
