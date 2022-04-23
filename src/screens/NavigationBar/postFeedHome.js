import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity, Text, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { Ionicons, SimpleLineIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { CustomSide } from './customDrawer';
import { PostList } from "../PostList";
import { Comments } from "../Comments";
import { CreatePost } from "../CreatePost";
import {EditProfile,ViewProfile} from "../ProfileManager";
import { CreateGroup, Groups,Chat } from "../Groups";
import { authUpdate } from "../../../firebase/firebase-config";
// import ViewP from "./viewProfile";
// import Invitations from "./invitations";
// import SentInvitations from "./sentInvititation";
// import CompletedTrips from "./completedTrips";
// import OngoingTrips from "./ongoingTrip";
import Services from "../services"
import DisplayService from "../displayService"


var keyboardH = 0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH = -400
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


// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <View style={{flexDirection:'row'}}>
//                <Image
//                source={require("../assets/profile.jpeg")}
//                 style={{
//                     height:40,
//                     width:40,
//                     borderRadius:50,
//                     marginRight:10,
//                 }}
//                 />
//     <Text style={styles.title}>{title}</Text>
//     <SimpleLineIcons name="options-vertical" size={15} color="#6c63ff" 
//     style={{position:'absolute',marginHorizontal:340}}
//     />
//     </View>
//     <View style={{flexDirection:'row'}}>
//     <Text style={styles.title1}>I'm going to Murree so anyone free.</Text>
//     </View>
//     <Image
//                source={require("../assets/muree.jpg")}
//                 style={{
//                   marginTop:10,
//                     height:200,
//                     width:320,
//                     borderRadius:10,
//                     marginLeft:20,
//                 }}
//                 />
//                 <View style={{flexDirection:'row'}}>
//                 <Text style={{marginLeft:230,marginTop:20}}>5 Comments</Text>
//                 <FontAwesome name="comments" size={24} color="#6c63ff"
//                 style={{marginLeft:10,marginTop:20}}
//                 />
//                 </View>
//   </View>
// );

function Posts({ navigation }) {

  //main screen when you login as a travel mate
  //display the list of posts of users


  // const renderItem = ({ item }) => <Item title={item.title} />;


  return (
    <View><Text>{"This is text"}</Text></View>
    // <SafeAreaView style={styles.container}>
    //     <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}
    //     style={{marginTop:0}}
    //     />
    //   </SafeAreaView>

  )
}

// import ViewP from "./viewProfile";
// import Invitations from "./invitations";
// import SentInvitations from "./sentInvititation";
// import CompletedTrips from "./completedTrips";
// import OngoingTrips from "./ongoingTrip";

const ViewP = () => <Text>{"\n\n./View profile';"}</Text>
const Invitations = () => <Text>{"\n\ninvitation"}</Text>
const SentInvitations = () => <Text>{"\n\nsentinvitation"}</Text>
const CompletedTrips = () => <Text>{"\n\ncomplete trip"}</Text>
const OngoingTrips = () => <Text>{"\n\nongointrips"}</Text>
const InsideGroup = ({route}) => {
  const {group_ID} =route.params;
  return (<Text style={{marginTop:150}}>{group_ID}</Text>
  )
}


const Drawer = createDrawerNavigator();


// const Comments=({navigation,route})=> {
//   const {_postID} =route.params;
//   return <Text>{"\n\n"+_postID}</Text>
// }

export function DrawNavg({ route, navigation }) {   //this component helps to navigate between screens in navbar
  //console.log("Params in main:" + userId)
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomSide {...props} />}
    // initialParams={{userId}}
    >
<Drawer.Screen
        name="Post Feed" component={PostList}
        options={(props) => {
          const { navigation, route } = props;
          return ({
            headerStyle: {
              backgroundColor: '#6c63ff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#e5e5e5'
            },
            headerTintColor: '#e5e5e5',
            gestureEnabled: false,
          })
        }}
      />

<Drawer.Screen name="Create Post" component={CreatePost}
        options={{
          headerStyle: {
            backgroundColor: '#6c63ff'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerTintColor: '#e5e5e5',
        }}
      />

      <Drawer.Screen
        name="Groups" component={Groups}
        options={(props) => {
          const { navigation, route } = props;
          return ({
            headerStyle: {
              backgroundColor: '#6c63ff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#e5e5e5'
            },
            headerTintColor: '#e5e5e5',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Create Group')}>
                <MaterialIcons name="group-add" size={30} color="#e5e5e5"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
            gestureEnabled: false,
          })
        }}
      />
        <Drawer.Screen
        name="Group Messaeges" component={Chat}
        options={(props) => {
          const { navigation, route } = props;
          return ({
            headerStyle: {
              backgroundColor: '#6c63ff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#e5e5e5'
            },
            headerTintColor: '#e5e5e5',
            // headerRight: () => (
            //   <TouchableOpacity onPress={() => navigation.navigate('Create Group')}>
            //     <MaterialIcons name="group-add" size={30} color="#e5e5e5"
            //       style={{ marginRight: 10 }}
            //     />
            //   </TouchableOpacity>
            // ),
            gestureEnabled: false,
          })
        }}
      />


      <Drawer.Screen name="Create Group" component={CreateGroup}
        options={{
          headerStyle: {
            backgroundColor: '#6c63ff'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerTintColor: '#e5e5e5',
        }}
      />

      <Drawer.Screen name="Post Comments" component={Comments}
        options={{
          headerStyle: {
            backgroundColor: '#6c63ff'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerTintColor: '#e5e5e5',
        }}
      />
            <Drawer.Screen
        name="Profile" component={ViewProfile}
        options={(props) => {
          const { navigation, route } = props;
          return ({
            headerStyle: {
              backgroundColor: '#6c63ff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#e5e5e5'
            },
            headerTintColor: '#e5e5e5',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Edit',{_userID: authUpdate.currentUser.uid})}>
              <AntDesign name="edit" size={24} color="#e5e5e5"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            ),
            gestureEnabled: false,
          })
        }}
      />
        <Drawer.Screen name="Edit" component={EditProfile}
      options={{
        headerStyle: {
          backgroundColor: '#6c63ff'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#e5e5e5'
        },
        headerTintColor: '#e5e5e5',
      }}
    />
        <Drawer.Screen name="Services" component={Services}
      options={{
        headerStyle: {
          backgroundColor: '#6c63ff'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#e5e5e5'
        },
        headerTintColor: '#e5e5e5',
      }}
    />
     
      <Drawer.Screen name="details" component={DisplayService}
        options={{
          headerStyle: {
            backgroundColor: '#6c63ff'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerTintColor: '#e5e5e5',
        }}
      />
      <Drawer.Screen name="Invitations" component={Invitations}
        options={{
          headerStyle: {
            backgroundColor: '#6c63ff'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerTintColor: '#e5e5e5',
        }}
      />
      <Drawer.Screen name="Sent Invitations" component={SentInvitations}
        options={{
          headerStyle: {
            backgroundColor: '#6c63ff'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerTintColor: '#e5e5e5',
        }}
      />
      <Drawer.Screen name="Completed Trips" component={CompletedTrips}
        options={{
          headerStyle: {
            backgroundColor: '#6c63ff'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerTintColor: '#e5e5e5',
        }}
      />
      <Drawer.Screen name="Ongoing Trips" component={OngoingTrips}
        options={{
          headerStyle: {
            backgroundColor: '#6c63ff'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#e5e5e5'
          },
          headerTintColor: '#e5e5e5',
        }}
      />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#6c63ff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  title1: {
    fontSize: 14,
    marginTop: -10,
    marginLeft: 50
  },
  title2: {
    fontSize: 14,
    marginLeft: 10
  },
})




