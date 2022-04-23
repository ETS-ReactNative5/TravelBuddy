import React, { useEffect, useState } from "react";
import {
  View,
   TouchableOpacity, Animated, Text, Image, StyleSheet,
} from "react-native";
import { SafeAreaView,FlatList } from 'react-native';
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
    title: 'Hospitals',
    url:require("../assets/hospital.png"),
    input:'healthcare.hospital',
    imageName:"hospital"

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Police Service',
    url:require("../assets/police.png"),
    input:'service.police',
    imageName:"police"
  },
  {
    id: '584a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pharmacy',
    url:require("../assets/pharmacy.png"),
    input:'healthcare.pharmacy',
    imageName:"pharmacy"
  },
  {
    id: '586aaa0f-3da1-471f-bd96-145571e29d12',
    title: 'Bus Station',
    url:require("../assets/bus.jpeg"),
    input:'public_transport.bus',
    imageName:"bus"
  },
  {
    id: '586941212f-3da1-471f-bd96-145571e29d12',
    title: 'Rent a Car',
    url:require("../assets/rent.png"),
    input:'rental.car',
    imageName:"rental"
  }
];
// useEffect(() => {
//     //     (async () => {
          
//     //       let { status } = await Location.requestForegroundPermissionsAsync();
//     //       if (status !== 'granted') {
//     //         setErrorMsg('Permission to access location was denied');
//     //         return;
//     //       }
    
//     //       let location = await Location.getCurrentPositionAsync({});
//     //       setLatitude(location.coords.latitude)
//     //       setLongitude(location.coords.longitude);
//     //       setLocation(location.coords);
//     //     })();
//     //   }, []);

const Item = ({ _title,_url,_input,_imageName,navigation }) => (
  <View style={styles.item}>
    <View style={{flexDirection:'row'}}>
               <Image
               source={_url}
                style={{
                    height:40,
                    width:40,
                    borderRadius:10,
                    marginLeft:25,
                    marginTop:10,
                }}
                />
    <TouchableOpacity onPress={()=>
    {
      navigation.navigate('details',{
        service:_input,
        title:_title,
        imageName:_imageName
      })
      console.log("myparams",_input)
    }
    }>
    <Text style={styles.title}>{_title}</Text>
    </TouchableOpacity>
    </View>
  </View>
);


// const getData = (title) => {
//     // return fetch('https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:73.011877,33.696041,5000&bias=proximity:73.011877,33.696041&limit=20&apiKey=c98a9c94fdd84d9e84aae33660aa116a')
//     //   .then((response) => response.json())
//     //   .then((json) => {
//     //       console.log(json)
//     //     return json.movies;
//     //   })
//     //   .catch((error) => {
//     //     console.error(error);
//     //   });
//   };



export default function Services({ navigation }) {

  //to display the groups travel mates have joined in

  const renderItem = ({ item }) => <Item _title={item.title} _url={item.url} _input={item.input} navigation={navigation} _imageName={item.imageName} />;


//   function getData(title){
//     navigation.navigate('details')
//   };


  return ( 

  <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}
      style={{marginTop:20}}
      />
      
    </SafeAreaView>

)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:0,
  },
  item: {
    backgroundColor: 'white',
    paddingTop: 10,
    margin:10,
    borderWidth:0.5,
    borderColor:'#6c63ff',
    borderRadius:20,
    height:80,
    shadowOpacity:0.6,
    shadowColor:'#3f3d56'
  },
  title: {
    fontSize: 24,
    marginTop:10,
    marginLeft:50,
    color:'#6c63ff'
  },
  title1: {
    fontSize: 14,
    marginLeft:60,
    marginVertical:-20
  },
  title2: {
    fontSize: 14,
    marginLeft:10,
  },
})




