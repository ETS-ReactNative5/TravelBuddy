import * as React from 'react';
import { Button,Image ,Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo,FontAwesome5 } from '@expo/vector-icons'; 




export function CustomSide({route,navigation}) {    //creating navbar to left side of the home screen

  // const { userId } = route.params;
  // console.log("Params in Custom Side:"+userId)

  //this is basically used to create a custom drawer bar according to the requirements needed



    return (
        <View style={{flex:1}}>
        <View style={{flex:1,backgroundColor:'#e5e5e5'}}>
            <View style={{flex:0.8,backgroundColor:'#e5e5e5'}}>
            <Image
               source={require("../../assets/group.png")}
                style={{
                    height:100,
                    width:100,
                    borderRadius:50,
                    marginTop:30,
                    marginLeft:70,
                }}
                />
                <View style={{flexDirection:'row',marginTop:20}}>
            <Text style={{marginTop:10,paddingLeft:60,fontSize:18,color:'#6c63ff',fontWeight:'bold'}}>M.Zulkifal khan</Text>
            </View>

                
        <TouchableOpacity onPress={() => navigation.navigate('Post Feed')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <Entypo name="home" size={18} color="#3f3d56" style={{marginTop:10,paddingLeft:10}}/>
        <Text style={{color:'#3f3d56',fontSize:16,marginTop:10,paddingLeft:10}}>Home</Text>
        </View>
      </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <AntDesign name="profile" size={18} color="#3f3d56" style={{marginTop:10,paddingLeft:10}} />
        <Text style={{color:'#3f3d56',fontSize:16,marginTop:10,paddingLeft:10}}>View Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Invitations')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <FontAwesome5 name="user-friends" size={18} color="#3f3d56" style={{marginTop:6,paddingLeft:10}} />
        <Text style={{color:'#3f3d56',fontSize:16,marginTop:10,paddingLeft:10}}>Invitations</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Completed Trips')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <MaterialIcons name="flight" size={18} color="#3f3d56" style={{marginTop:6,paddingLeft:10}} />
        <Text style={{color:'#3f3d56',fontSize:16,marginTop:10,paddingLeft:10}}>Trips</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.switchBtn} onPress={() => navigation.navigate('')}>
         <Text style={{fontSize:15,color:'#6c63ff',fontWeight:'bold'}}>Switch to Travel Guide</Text>
       </TouchableOpacity>

       <TouchableOpacity>
        <View style={{flexDirection:'row',marginTop:30}}>
        <AntDesign name="logout" size={20} color="#3f3d56" style={{marginTop:10,paddingLeft:10}} />
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
    switchBtn: {
      borderWidth:1,
      position:'relative',
      borderColor:'#6c63ff',
      width: "90%",
      borderRadius:25,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      marginLeft:10,
      marginTop: 90,
    }

  });