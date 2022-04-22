import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/mainLogin";
import SignIn from "../screens/signin";
import SignUp from "../screens/signup";
import Home from "../screens/homePosts";
// import Edit from "../screens/editProfile";
import CompleteProfile from "../screens/completeProfile";
import AppIntro from "../screens/appIntroSlider";
import DeleteIt from "../screens/DeleteIt";
import AuthLoader from "../screens/AuthLoader";
import { CreateGroup, Groups } from "../screens/Groups";
import { EditProfile, ViewProfile } from "../screens/ProfileManager";
// import Invitations from "../screens/invitations";
// import SentInvitations from "../screens/sentInvititation";
// import CompletedTrips from "../screens/completedTrips";
// import OngoingTrips from "../screens/ongoingTrip";



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
        
        {/* <Stack.Screen name="deleteit" component={DeleteIt} options={{headerShown: false}}/> */}
        <Stack.Screen name="main" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="login" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="register" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="showgroups" component={Groups} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={ViewProfile} options={{headerShown: false}}/>
        <Stack.Screen name="editprofile" component={EditProfile} options={{headerShown: false}}/>
        <Stack.Screen name="completeProfile" component={CompleteProfile} options={{headerShown: false}}/>
        <Stack.Screen name="appIntro" component={AppIntro} options={{headerShown: false}}/>
        <Stack.Screen name="deleteit" component={DeleteIt} options={{headerShown: false}}/>
        <Stack.Screen name="authloader" component={AuthLoader} options={{headerShown: false}}/>
        <Stack.Screen name="createGroup" component={CreateGroup} options={{headerShown: false}}/>
        {/* <Stack.Screen name="invite" component={Invitations} options={{headerShown: false}}/> */}
        {/* <Stack.Screen name="sentInvite" component={SentInvitations} options={{headerShown: false}}/> */}
        {/* <Stack.Screen name="completeTrips" component={CompletedTrips} options={{headerShown: false}}/> */}
        {/* <Stack.Screen name="ongoingTrips" component={OngoingTrips} options={{headerShown: false}}/>       */}
      </Stack.Navigator>
    </NavigationContainer>
  )
};
