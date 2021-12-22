import * as React from 'react';
import { Button,Image ,Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import { auth, signOut } from "../../../firebase";
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 




export default function CustomSide({route,navigation}) {

  // const { userId } = route.params;
  // console.log("Params in Custom Side:"+userId)

  const signOut = () => {
  auth
  .signOut()
  .then(()=>{
    navigation.navigate('/')
  })

  }


    return (
        <View style={{flex:1}}>
        <View style={{flex:1,backgroundColor:'#FFB6C1'}}>
            <View style={{flex:0.8,backgroundColor:'#FFB6C1'}}>
                <Image
               source={require("../../images/man.png")}
                style={{
                    height:100,
                    width:100,
                    borderRadius:50,
                    marginTop:30,
                    marginLeft:70
                }}
                />
                <View style={{flexDirection:'row',marginTop:40}}>
                <AntDesign name="user" size={24} color="black" style={{marginTop:10,paddingLeft:10}}/>
            <Text style={{marginTop:10,paddingLeft:10,fontSize:18,color:'white'}}>M.Zulkifal khan</Text>
            </View>

                
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <Entypo name="home" size={24} color="black" style={{marginTop:10,paddingLeft:10}}/>
        <Text style={{color:'white',fontSize:16,marginTop:10,paddingLeft:10}}>Home</Text>
        </View>
      </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <AntDesign name="profile" size={24} color="black" style={{marginTop:10,paddingLeft:10}} />
        <Text style={{color:'white',fontSize:16,marginTop:10,paddingLeft:10}}>View Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('smart')}>
        <View style={{flexDirection:'row',marginTop:20}}>
        <Feather name="search" size={24} color="black" style={{marginTop:10,paddingLeft:10}} />
        <Text style={{color:'white',fontSize:16,marginTop:10,paddingLeft:10}}>Smart Search</Text>
        </View>
      </TouchableOpacity>
     
      {/* <TouchableOpacity onPress={() => navigation.navigate('display_group')}>
      <View style={{flexDirection:'row',marginTop:20}}>
      <MaterialIcons name="groups" size={24} color="black" style={{marginTop:10,paddingLeft:10}} />
        <Text style={{color:'white',fontSize:16,marginTop:10,paddingLeft:10}}>Groups</Text>
        </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => navigation.navigate('display_invite')}>
      <View style={{flexDirection:'row',marginTop:20}}>
      <MaterialIcons name="groups" size={24} color="black" style={{marginTop:10,paddingLeft:10}} />
        <Text style={{color:'white',fontSize:16,marginTop:10,paddingLeft:10}}>Invitation</Text>
        </View>
        </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
         <Text style={{fontSize:15,color:'white'}}>Switch to Travel Guide</Text>
       </TouchableOpacity>
      </View>
        </View>
               <View style={{flex:0.2,backgroundColor:'#FFB6C1'}}>
               <TouchableOpacity  onPress={signOut}>
                 <View style={{flexDirection:'row'}}>
               <Feather name="log-out"  size={24} color="black" style={{marginTop:40,paddingLeft:10}} />
               <Text style={styles.loginBtn}style={{color:'white',fontSize:20,marginTop:40,paddingLeft:20,flexDirection:'row'}}>Sign Out</Text>
               </View>
             </TouchableOpacity>
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
      color: '#FFB6C1',
    },
    loginBtn: {
      borderWidth:1,
      position:'relative',
      borderColor:'rgba(0,0,0.2,0.2)',
      width: "80%",
      borderRadius:45,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      marginLeft:20,
      marginTop: 10,
      backgroundColor: "#F08080",
  
    }

  });