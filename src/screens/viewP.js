import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, } from 'react-native-elements';
import {
    View,
    TouchableOpacity, Animated, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView
} from "react-native";
import { SafeAreaView, FlatList } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

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
        title: 'zulkifalkhan436@gmail.com',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Islamabad Pakistan',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Male',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d12',
        title: 'Profession',
    }
    ,
    {
        id: '5869410f-3da1-471f-bd96-145571e29d12',
        title: '0331212121',
    }
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
            <Text>{title}</Text>
        </View>
    </View>
);




export default function ViewP({ navigation }) {

    const renderItem = ({ item }) => <Item title={item.title} />;


    return (

        <SafeAreaView style={styles.container}>
            <Image
                source={require("../assets/profile.jpeg")}
                style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    marginRight: 55,
                    marginLeft: 130,
                    paddingRight: 50,
                    marginBottom: 5,
                }}
            />
            <Text style={styles.title}>Zulkifal Khan</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
            <Text style={styles.title1}>Posts</Text>
            <Text style={styles.title2}>Groups</Text>
            <Text style={styles.title3}>Connections</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.title11}>20</Text>
            <Text style={styles.title22}>4</Text>
            <Text style={styles.title33}>3</Text>
            </View>
         
            <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}
                style={{ marginTop: 20 }}
            />
        </SafeAreaView>

    )
}


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
        fontSize: 16,
        marginTop: 10,
        marginLeft: 140,
    },
    title1: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 20,
        color:'#6c63ff'
    },
    title2: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 80,
        color:'#6c63ff'
    },
    title3: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 40,
        color:'#6c63ff'
    },
    title11: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 30,
        color:'#3f3d56'
    },
    title22: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 120,
        color:'#3f3d56'
    },
    title33: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 120,
        color:'#3f3d56'
    },
})




