import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import S1 from './postFeedHome';
// import S2 from './searchPosts';
// import S3 from './findGuides'; 
// import S4 from '../groups';
import { Entypo, FontAwesome, Feather, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import {
  View,
  TouchableOpacity, Text, Button, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView
} from "react-native";
import
MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawNavg } from './postFeedHome';
import { CreatePost } from '../CreatePost';
// import SearchPost from './searchPosts';
// import FindTravelGuide from './findGuides';
// import Groups from '../groups';


const S1 = () => <Text>{"\n\n./postFeedHome';"}</Text>
const S2 = () => <Text>{"\n\nS2"}</Text>
const S3 = () => <Text>{"\n\nS3"}</Text>
const S4 = () => <Text>{"\n\nS4"}</Text>

const SearchPost = () => <Text>{"\n\nSearchPost"}</Text>
const FindTravelGuide = () => <Text>{"\n\Find travel guide"}</Text>
const Groups = () => <Text>{"\n\Groups"}</Text>


const Tab = createBottomTabNavigator();


export function Tabs() {

  //create tab navigator bar to switch between screens


  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        activeTintColor: '#6c63ff',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderRadius: 5,
          height: 60,
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={DrawNavg}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color="#3f3d56"
              size={size}
            />
          ),
        }} />
      <Tab.Screen
        name="Search"
        component={SearchPost}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color="#3f3d56" />
          ),
        }} />
      <Tab.Screen
        name="add"
        component={CreatePost}
        options={{
          tabBarLabel: 'Post',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={50} color="#6c63ff" />
          ),
        }} />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: 'Groups',
          headerStyle: {
            backgroundColor: '#6c63ff',
          }, headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerRight: () => (
            <MaterialIcons name="group-add" size={30} color="#e5e5e5"
              style={{ marginRight: 10 }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={24} color="#3f3d56" />
          ),
        }} />
      <Tab.Screen
        name="Search11"
        component={FindTravelGuide}
        options={{
          tabBarLabel: 'Find',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="find" size={24} color="#3f3d56" />
          ),
        }} />

    </Tab.Navigator>
  );
}



  ///tabBarBadge: 3 

