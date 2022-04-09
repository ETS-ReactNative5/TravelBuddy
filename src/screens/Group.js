import React,{useState,useEffect} from 'react'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'

import { useIsFocused } from '@react-navigation/native';
import Header from "./Appbar"
import { getGroupList } from '../Manager/BLogic'; //Post data

const Group = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [GroupList, setGroupList] = useState(null);

    const fetchGroupList=()=>{
        setGroupList(getGroupList())
    }

    useEffect(() => {
        if(isFocused){
            fetchGroupList()
        }
    }, [isFocused]);

    if(GroupList){
        return (
            <View style={styles.container}>
                <Header title={"Group"}></Header>
                {GroupList.map((element,index)=>{
                return (
                    <View key={index}>
                        <TouchableOpacity onPress={() => navigation.navigate("chat",{_groupID:element.groupID,_groupName:element.name})}><Text>{element.name}</Text></TouchableOpacity>    
                    </View>
                ) 
                
                })}
                
            </View>
        )
    }else{
        return(
            <View><Text>{"Place load compoent"}</Text></View>
        )
    }
}

export default Group

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
  })