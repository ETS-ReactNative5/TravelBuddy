import * as React from 'react';
import { Button,Image ,Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 




export default function CustomSide({route,navigation}) {    //creating navbar to left side of the home screen

  // const { userId } = route.params;
  // console.log("Params in Custom Side:"+userId)



    return (
        <View style={{flex:1}}>
        <View style={{flex:1,backgroundColor:'#e5e5e5'}}>
            <View style={{flex:0.8,backgroundColor:'#e5e5e5'}}>
            <Image
               source={require("../assets/profile.jpeg")}
                style={{
                    height:100,
                    width:100,
                    borderRadius:50,
                    marginTop:30,
                    marginLeft:70,
                }}
                />
                <View style={{flexDirection:'row',marginTop:20}}>
                <AntDesign name="user" size={24} color="#3f3d56" style={{marginTop:10,paddingLeft:10}}/>
            <Text style={{marginTop:10,paddingLeft:10,fontSize:18,color:'#3f3d56',fontWeight:'bold'}}>M.Zulkifal khan</Text>
            </View>

                
        <TouchableOpacity onPress={() => navigation.navigate('Post Feed')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <Entypo name="home" size={24} color="#3f3d56" style={{marginTop:10,paddingLeft:10}}/>
        <Text style={{color:'#3f3d56',fontSize:16,marginTop:10,paddingLeft:10}}>Home</Text>
        </View>
      </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <AntDesign name="profile" size={24} color="#3f3d56" style={{marginTop:10,paddingLeft:10}} />
        <Text style={{color:'#3f3d56',fontSize:16,marginTop:10,paddingLeft:10}}>View Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <View style={{flexDirection:'row',marginTop:20}}>
        <AntDesign name="setting" size={24} color="#3f3d56" style={{marginTop:10,paddingLeft:10}} />
        <Text style={{color:'#3f3d56',fontSize:16,marginTop:10,paddingLeft:10}}>Settings</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
         <Text style={{fontSize:15,color:'#e5e5e5',fontWeight:'bold'}}>Switch to Travel Guide</Text>
       </TouchableOpacity>

       <TouchableOpacity >
        <View style={{flexDirection:'row',marginTop:50}}>
        <AntDesign name="logout" size={24} color="#3f3d56" style={{marginTop:10,paddingLeft:10}} />
        <Text style={{color:'#3f3d56',fontSize:16,marginTop:10,paddingLeft:10}}>Log Out</Text>
        </View>
      </TouchableOpacity>

      </View>
        </View>
               </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 5, 
    },
  
    forgot_button: {
      height: 30,
      marginBottom: 30,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#6c63ff',
    },
    loginBtn: {
      borderWidth:1,
      position:'relative',
      borderColor:'rgba(0,0,0.2,0.2)',
      width: "90%",
      borderRadius:15,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      marginLeft:10,
      marginTop: 50,
      backgroundColor: "#6c63ff",
  
    }

  });