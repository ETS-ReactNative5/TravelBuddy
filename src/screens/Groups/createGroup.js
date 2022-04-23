import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, FlatList, Dimensions,
} from "react-native";

//external dependancies
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, } from 'react-native-elements';
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { Controller } from "../../../BLogic/Controller";
import { authUpdate } from "../../../firebase/firebase-config";
import { ImageUpload } from "../ImageUpload";

var keyboardH = 0

if (Platform.OS === 'ios') {
    keyboardH = 1
} else {
    keyboardH = -400
}



export const CreateGroup = ({ navigation }) => {
    const isFocused = useIsFocused(); //for update of state variables
    const [Title, setTitle] = useState("");
    const [ImageURL, setImageURL] = useState(null);
    const [uploadFlag, setuploadFlag] = useState(false);


    const uploadImage = async (_image) => {//pass to ImageUpload as prop to handle imageSet.
        setImageURL(_image);
    }

    const toggleUploadFlag = () => {//pass to ImageUpload as prop to handle toggle for display.
        setuploadFlag(prev => !prev)
    }

    const handleCreateGroup = async () => {
        const _id = authUpdate.currentUser.uid;
        const obj = new Controller();
        let _flag = await obj.makeGroup(_id, Title, ImageURL)
        setImageURL(null)
        setTitle("")
        if (_flag) navigation.navigate("Groups")
    }

    useEffect(async () => {

    }, [isFocused]);



    if (!uploadFlag) return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardH}>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View>
                    <View style={{
                        backgroundColor: '#6c63ff',
                        position: 'absolute',
                        width: 400,
                        height: 400,
                        borderRadius: 200,
                        right: -100,
                        top: -200,
                    }}></View>
                    <View style={{
                        backgroundColor: '#e5e5e5',
                        position: 'absolute',
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        left: -50,
                        top: -50,
                    }}></View>

                    <View style={{ paddingVertical: 220, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: '#3f3d56', marginBottom: 60, fontWeight: 'bold' }}>TravelBuddy</Text>

                        <View style={{ flex: 1, alignContent: "center", justifyContent: "center", marginBottom: 15 }}>
                            <Text style={{ marginLeft: "17%" }}>{"Click on Image to Change"}</Text>
                            <TouchableOpacity onPress={() => { toggleUploadFlag() }}>
                                <Image
                                    source={ImageURL ? { uri: ImageURL } : require("../../assets/group.png")}
                                    style={{
                                        height: 190,
                                        width: 190,
                                        borderRadius: 50,
                                        marginRight: 25,
                                        marginLeft: "14%"
                                    }}
                                />
                            </TouchableOpacity>

                        </View>
                        <Input
                            textAlign={"center"}
                            placeholder='Enter group title'
                            value={Title}
                            onChangeText={value => setTitle(value)}
                        />

                        <TouchableOpacity style={styles.loginBtn} onPress={() => { handleCreateGroup() }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e5e5e5' }}>Create Group</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
    else return (
        <ImageUpload _firstButtonContent={"Pick Image"} _secondButtonContent="Upload Image" _parentImageSetter={uploadImage} _toggleButton={toggleUploadFlag} />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    loginBtn: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0.2,0.2)',
        width: "40%",
        borderRadius: 45,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#6c63ff",

    },
})
