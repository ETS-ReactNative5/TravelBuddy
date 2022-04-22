import React,{useEffect} from "react";
import {
    View,
    TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, ScrollView
} from "react-native";
import { LogoutUser } from "../../firebase/authentication";
import { authUpdate } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage as testStorage } from "../../StateStorage";

var keyboardH = 0
if (Platform.OS === 'ios') {
    keyboardH = 1
} else {
    keyboardH = -400
}


export default function DeleteIt({ navigation }) {

    const showCurrentUser = async () => {
        let tempo = await testStorage("UserData")
        console.log(tempo)
        const currentUser = authUpdate.currentUser
        console.log(currentUser.uid)
    }

    const deleteGroupNav=async ()=>{
        navigation.navigate("showgroups")
    }

    useEffect(()=>{
        // navigation.navigate("completeProfile",{_userID:"ypTO4gAG30OY7mbRGI0mIr5KSlx2"})
        navigation.navigate("editprofile",{_userID:"ypTO4gAG30OY7mbRGI0mIr5KSlx2"})
    })


    return (
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
                        <Text style={{ fontSize: 30, color: '#2f2e41', marginBottom: 60, fontWeight: 'bold' }}>Welcome to TravelBuddy</Text>


                        <TouchableOpacity style={styles.loginBtn} onPress={() => { showCurrentUser(); }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e5e5e5' }}>Show User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => { deleteGroupNav(); }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e5e5e5' }}>Show Group</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => { LogoutUser(); }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e5e5e5' }}>Logout User</Text>
                        </TouchableOpacity>


                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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




