import * as React from 'react';
import { StatusBar, TouchableOpacity, Animated, Text, Image, FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo3 from "./../../images/backpacker.png"
import logo1 from "./../../images/1.png"
import logo2 from "./../../images/2.png"
import slide from "./../../images/slide.png"
const { width, height } = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/

const bgs = ['#F08080', '#CD5C5C', '#E9967A'];
const DATA = [
  {
    "key": "3571572",
    "title": "Welcome to Travel Buddy",
    "description": "We will help you find out the best Travel Mate or Travel Guide",
    "padding":30,
    "image": logo1
  },
  {
    "key": "3571747",
    "title": "Travel Mate",
    "description": "Find whose waiting you to join them in there Adventure!!",
    "login":"Sign In",
    "Reg":"Create Account",
    "padding":50,
    "color":"white",
    "image": logo2
  },
  {
    "key": "3571680",
    "title": "Travel Guide",
    "description": "Let's See who can help you to make your Adventure your Best One!!",
    "Reg":"Be a Travel Guide",
    "padding":50,
    "color":"#800000",
    "image": logo3
  }
]



const Backdrop = ({ scrollX }) => {

  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  })

  return <Animated.View
    style={[
      StyleSheet.absoluteFillObject,
      {
        backgroundColor,
      }
    ]}
  />
}



export default function MainScreen({navigation}) {      //creating app intro slider containg screens to register and login
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList                //flat list moving horizontally
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
        pagingEnabled
        renderItem={({ item }) => {
          return <View style={{ width, alignItems: 'center', padding: 30 }}>
            <View style={{ flex: .7, justifyContent: 'center' }}>
              <Image source={item.image} style={{ width: width / 2, height: width / 2, resizeMode: 'contain' }} />
            </View>
            <View style={{ flex: .3 }}>
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 28, marginBottom: 20 }}>{item.title}</Text>
              <Text style={{ fontWeight: '400', fontSize: 20 }}>{item.description}</Text>
              <View style={{display:'flex',flexDirection:"row"}}>
              <TouchableOpacity style={{position:'relative',paddingVertical:30,paddingLeft:10}} onPress={() => navigation.navigate('/')}>
              <Text style={{color:'#FFB6C1',fontSize:25}}>{item.login}</Text>
              </TouchableOpacity>
              <Text>{"            "}</Text>
              <TouchableOpacity style={{position:'relative',paddingVertical:30,paddingLeft:10}} onPress={() => navigation.navigate('SignUp')}>
              <Text style={{color:item.color,fontSize:25}}>{item.Reg}</Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity style={{position:'relative',paddingVertical:item.padding,paddingLeft:120}}>
              <Image source={slide} style={{ width: 40, height:40}} />
              </TouchableOpacity>
            </View>
          </View>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({      //style object
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
