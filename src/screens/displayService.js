import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity, Animated, Text, Image, StyleSheet,
} from "react-native";
import { SafeAreaView, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';

var keyboardH = 0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH = -400
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let DATA = [];

let iconDictionary={
  hospital:"../assets/hospital.png",
  police:"../assets/police.png",
  Pharmacy:"../assets/hospital.png",
  BusStation:"../assets/hospital.png",
  RentaCar:"../assets/police.png"
}

const Item = ({ name, address,title,_imageName }) => (
  <View style={styles.item}>
    <View style={{ flexDirection: 'row' }}>
    <Image
        source={
          _imageName=="hospital" ? require(`../assets/hospital.png`) 
          : _imageName=="police" ?  require(`../assets/police.png`) : 
          _imageName=="bus" ? require(`../assets/bus.jpeg`) :
          _imageName=="pharmacy" ? require("../assets/pharmacy.png") :
          require("../assets/rent.png") 
        }
        style={{
          height: 40,
          width: 40,
          borderRadius: 50,
          marginRight: 25,
          marginBottom: 15,
        }}
      ></Image>
      <Text style={styles.title}>{name}</Text>
    </View>
    <Text style={styles.title}>{address}</Text>
  </View>
);




export default function DisplayService({ route, navigation }) {

  //to display the groups travel mates have joined in
  const isFocus=useIsFocused();
  const { service,title,imageName } = route.params;


  const renderItem = ({ item }) => <Item name={item.name} address={item.address} title={item.title} _imageName={imageName}/>;

  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [serv, setService] = useState('');

    const getCoords=async()=> {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude);
      setLocation(location.coords);
      console.log(location.coords.latitude,location.coords.longitude)
      console.log(latitude,longitude)
      return location.coords;
  }


  useEffect(async () => {

    console.log(imageName) 
    if(isFocus){
      let _location;
      if(!(longitude && latitude)){
        _location=await getCoords();
      }else{
        _location=location
      }
      fetch(`https://api.geoapify.com/v2/places?categories=${service}&filter=circle:${_location.longitude},${_location.latitude},5000&bias=proximity:${_location.longitude},${_location.latitude}&limit=20&apiKey=c98a9c94fdd84d9e84aae33660aa116a`)
        .then((response) => response.json())
        .then((json) => {
          // console.log("DAtA:"+json.features[0].properties)
          setData(json.features)
          console.log(data)
          //console.log(json.features.length)
          DATA=[]
          for (var i = 0; i < json.features.length; i++) {
            //   console.log("DAtA:"+json.features[i].properties.name)
            // console.log("DAtA:"+json.features[i].properties.address_line2)
            
            DATA.push({
              id: i,
              name: json.features[i].properties.name,
              address: json.features[i].properties.address_line2
            })
          }

          //return json.movies;
          setData(DATA)
          //console.log(DATA)
        })
        .catch((error) => {
          console.error(error);
        });
  }
  }, [isFocus]);




  return (

    <SafeAreaView style={styles.container}>
      {
        data.length > 0 ?
          <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}
            style={{ marginTop: 0 }} /> : <Text style={{
              alignItems: 'center', justifyContent: 'center', marginTop: 200, marginLeft: 80
              , color: "#6c63ff", fontSize: 18
            }}>Sorry No {title} Availabe</Text>     //add loading component
      }

    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#6c63ff',
  },
  title: {
    fontSize: 14,
    marginRight: 10
  },
  title1: {
    fontSize: 14,
    marginLeft: 30,
    marginVertical: -20
  },
  title2: {
    fontSize: 14,
    marginLeft: 10,
  },
})




