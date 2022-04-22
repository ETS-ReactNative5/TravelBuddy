import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity, Animated, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList, Dimensions
} from "react-native";
//external dependancies
import SearchBar from "react-native-dynamic-search-bar";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Controller } from "../../../BLogic/Controller";
import { Loader } from "../Loader/Loader";
import { authUpdate } from "../../../firebase/firebase-config";
// import { StatusBar } from "expo-status-bar";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator,Header } from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input,Button, } from 'react-native-elements';
// import { SafeAreaView,FlatList } from 'react-native';
// import { Dimensions } from 'react-native';

var keyboardH = 0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH = -400
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Travel Group',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Travel Group',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Travel Group',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d12',
    title: 'Travel Group',
  }
];





export function Groups({ navigation }) {
  //It will display the group that current user is joined
  const [GroupList, setGroupList] = useState(null);
  const renderItem = ({ item }) => <Item _title={item.title} _lastComment={item.lastComment} _imageUrl={item.imageUrl} _groupID={item.groupID} />;


  const filterCurrentUserGroup = async (_result) => {
    const currentUserID = authUpdate.currentUser.uid;
    const result = _result.filter(obj => obj.members.includes(currentUserID))
    return result
  }

  useEffect(async () => {
    const obj = new Controller();
    let result = await obj.getAllGroup()
    result = await filterCurrentUserGroup(result)
    setGroupList(result)
  }, [])

  if (GroupList) {
    if (GroupList.length > 0) return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          fontColor="#c6c6c6"
          iconColor="#c6c6c6"
          placeholder="Search Groups"
          style={{ marginTop: -20 }}
        />
        <FlatList data={GroupList} renderItem={renderItem} keyExtractor={item => item.groupID}
          style={{ marginTop: 20 }}
        />

      </SafeAreaView>

    )
    else return (
      <View style={{flex:1,alignContent:"center",justifyContent:"center"}}>
        <Text style={{marginLeft:"30%",marginBottom:10,fontSize:25,color:"#6c63ff"}}>{"No Group yet...."}</Text>
        <Image
          source={require("../../assets/NoGroup.png")}
          style={{
            height: 190,
            width: 190,
            borderRadius: 50,
            marginRight: 25,
            marginBottom: 15,
            marginLeft:"25%"
          }}
        />
      </View>
    )
  }
  else return (
    <Loader></Loader>
  )
}


const Item = ({ _title, _lastComment, _imageUrl, _groupID }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => console.log(_groupID)}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={_imageUrl ? { uri: _imageUrl } : require("../../assets/group.png")/*conditional rendering if image is not present */}
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            marginRight: 25,
            marginBottom: 15,
          }}
        />
        <Text style={styles.title}>{_title}</Text>
        <SimpleLineIcons name="options-vertical" size={15} color="#6c63ff"
          style={{ position: 'absolute', marginHorizontal: 340 }}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title1}>{_lastComment}</Text>
      </View>
    </TouchableOpacity>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#6c63ff',
  },
  title: {
    fontSize: 20,
    marginTop: 0
  },
  title1: {
    fontSize: 14,
    marginLeft: 60,
    marginVertical: -20
  },
  title2: {
    fontSize: 14,
    marginLeft: 10,
  },
})




