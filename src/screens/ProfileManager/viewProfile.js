import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity, Animated, Text, SectionList, Image, StyleSheet, KeyboardAvoidingView, ScrollView
} from "react-native";
import { SafeAreaView, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Loader } from "../Loader/Loader";
import { Controller } from "../../../BLogic/Controller";

var keyboardH = 0

if (Platform.OS === 'ios') {
    keyboardH = 1
} else {
    keyboardH = -400
}

const Item = ({ title }) => (
    <View style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
            <Text>{title}</Text>
        </View>
    </View>
);



export function ViewProfile({ route, navigation }) {


    //to view user profile as a travel mate
    const { _userID } = route.params;
    const renderItem = ({ item }) => <Item title={item.title} />;
    const [CurrentUser, setCurrentUser] = useState(null);

    const fetchUserDetails = async (_profileID) => {
        let obj = new Controller();
        let result = await obj.showProfile(_profileID)
        setCurrentUser(result);
    }

    useEffect(async () => {
        await fetchUserDetails(_userID);
    }, [])

    if (CurrentUser) return (

        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 0, marginLeft: 10 }}>
                <Image
                    source={CurrentUser.image ? { uri: CurrentUser.image } : require("../../assets/profile.jpeg")}
                    style={{
                        height: 80,
                        width: 80,
                        borderRadius: 60,
                        marginRight: 25,
                        marginTop: 3,
                        marginLeft: 10,
                        marginBottom: 0,
                    }}
                />
                <Text style={styles.title}>{CurrentUser.name}</Text>
                {/* <TouchableOpacity style={styles.editBtn}>
         <Text style={{fontWeight:'bold',fontSize:18,color:'#6c63ff'}}>Edit Profile</Text>
       </TouchableOpacity> */}
            </View>

            <Text style={styles.about}>Lets Travel Together...</Text>
            <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
                <Entypo name="location-pin" size={16} color="#6c63ff" style={{ marginTop: 6 }} />
                <Text style={styles.location}>{CurrentUser.address}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                <FontAwesome name="phone" size={14} color="#6c63ff" style={{ marginTop: 6 }} />
                <Text style={styles.phone}>{CurrentUser.contact}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                <Entypo name="mail" size={14} color="#6c63ff" style={{ marginTop: 6 }} />
                <Text style={styles.email}>{CurrentUser.email}</Text>
            </View>



            <View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity>
                        <Text style={styles.title1}>Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.title2}>Groups</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.title3}>Connections</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title11}>20</Text>
                    <Text style={styles.title22}>4</Text>
                    <Text style={styles.title33}>3</Text>
                </View>
            </View>


            <View style={{
                borderRadius: 2,
                borderWidth: 0.3,
                borderColor: '#6c63ff',
                padding: 10,
                marginTop: 10,
                height: "15%"
            }}>
                <Text style={styles.interest}>Interest and Hobbies:</Text>
                <Text style={styles.interest1}>{CurrentUser.hobbies}</Text>
            </View>

        </SafeAreaView>

    )
    else return (
        <Loader></Loader>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    editBtn: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0.2,0.2)',
        width: "30%",
        borderRadius: 10,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#e5e5e5",
        marginLeft: 135

    },
    item: {
        backgroundColor: 'white',
        padding: 15,
        borderWidth: 0.5,
        borderColor: '#6c63ff',
    },
    title: {
        fontSize: 25,
        marginTop: 25,
        marginBottom: 10
    },
    history: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 10,
        color: '#6c63ff',
        fontWeight: 'bold'
    },
    interest: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 10,
        color: '#6c63ff',
        fontWeight: 'bold'
    },
    interest1: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 10,
    },
    about: {
        fontSize: 13,
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 10
    },
    location: {
        fontSize: 14,
        marginTop: 4,
        paddingLeft: 10
    },
    phone: {
        fontSize: 14,
        marginTop: 4,
        paddingLeft: 10,
    },
    email: {
        fontSize: 14,
        marginTop: 4,
        paddingLeft: 10,
    },
    title1: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 20,
        color: '#6c63ff',
        fontWeight: 'bold'
    },
    title2: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 75,
        color: '#6c63ff',
        fontWeight: 'bold'
    },
    title3: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 45,
        color: '#6c63ff',
        fontWeight: 'bold'
    },
    title11: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 30,
        color: '#3f3d56',
        fontWeight: 'bold'
    },
    title22: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 120,
        color: '#3f3d56',
        fontWeight: 'bold'
    },
    title33: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 120,
        color: '#3f3d56',
        fontWeight: 'bold'
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#f4f4f4',
        marginTop: 20,
        marginBottom: 5,
    },
    item1: {
        margin: 10,
    },
    itemPhoto: {
        width: 200,
        height: 200,
    },
    itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
    },
})




