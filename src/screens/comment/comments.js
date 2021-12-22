import React, { useEffect, useState } from "react";
import { Button, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'
import { db } from "../../../firebase-config"
import { collection, doc, documentId, getDocs, addDoc, setDoc, updateDoc, query, deleteDoc, where, orderBy } from "firebase/firestore"


faker.seed(10);




const DATA = [...Array(30).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
        location: 'Muree',
        budget: "10000",
        days: "3",
        status: 'individual',
        uid: "saqib@test.com"
    };
});

const SPACING = 20;
const AVATAR_SIZE = 50;


export default function CommentScreen({ route, navigation }) {

    const { postId } = route.params;
    console.log("Params in Comment:" + postId)
    const postCollectionRef = collection(db, "post");
    const [user, setUser] = useState([])
    const [uid, setUid] = useState("")
    const [desc, setDesc] = useState("")
    const [location, setLocation] = useState("")
    const [budget, setBudget] = useState("")
    const [days, setDays] = useState("")
    const [comments, setComments] = useState([])
    const [com, setCom] = useState("")

    useEffect(() => {
        const getPost = async () => {
            // var id;
            const q = query(postCollectionRef);
            // console.log(post[0])
            const getResult = await getDocs(q)
            getResult.forEach((doc) => {
                if (doc.id == postId) {
                    console.log(doc.data())
                    setBudget(doc.data().budget)
                    setLocation(doc.data().location)
                    setDays(doc.data().days)
                    setDesc(doc.data().description)
                    setComments(doc.data().comments)
                    setUid(doc.data().uid)
                }
            });

        }

        //console.log(user[0].id)

        getPost()

    }, [])

    //   user.sort(function (x, y) {
    //     return y.postTime - x.postTime;
    //   })



    //   function comment(id){
    //     console.log("Post Id:"+id);
    //   }


    function ViewP(id) {
        navigation.navigate('report', {
            userId: userId,
            repId: id
        })
    }


    const comFtn = async () => {

        
        // prevComment.push({ "comment_text": com, "uid": uid })
        // console.log(comments)
        // console.log(com)
        // console.log(uid)
         console.log(postId)
        // console.log(prevComment)
        const UpdateComment = async () => {
            // console.log("testo")
            let prevComment = comments
            prevComment.push({ "comment_text": com, "uid": uid })
            await updateDoc(doc(db, "post", postId), {
                comments: prevComment
            });
        }
        UpdateComment()
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{borderWidth:1,borderRadius:10,marginTop:30,marginBottom:40,marginLeft:30,width:"80%",height:"28%",borderColor:"#F08080"}}>
                <TouchableOpacity onPress={(() => ViewP(item.uid))}>
                    <Text style={{ fontSize: 22, fontWeight: '600',marginLeft:100,marginBottom:5 }}>{uid}</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 18, opacity: .7,marginLeft:25,marginBottom:5 }}>Going to :{" "}{location}</Text>
                <Text style={{ fontSize: 18, opacity: .7,marginLeft:25,marginBottom:5 }}>Trip Budget:{" "}{budget}</Text>
                <Text style={{ fontSize: 18, opacity: .7,marginLeft:25,marginBottom:5 }}>Trip Days:{" "}{days}</Text>
                <Text style={{ fontSize: 20, opacity: .8,marginLeft:25, color: '#F08081' }}>{desc}</Text>
            </View>
            <Text style={{marginLeft:120,marginTop:-20,fontSize:20,color:"#F08080"}}>Comments:</Text>
            <View style={{marginLeft:100,marginTop:10}}>
                {comments.map(value =>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:18}}>{value.uid} :{"  "}</Text>
                        <Text style={{fontSize:18}}>{value.comment_text}</Text>
                    </View>
                )}
            </View>
            <TextInput placeholder="enter comment" onChangeText={value => setCom(value)}></TextInput>
                        <Button title="comment" onPress={comFtn}></Button>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    display: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0.2,0.2)',
        width: "70%",
        height: '45%',
        borderRadius: 8,
        color: 'black',
        fontSize: 20,
        paddingLeft: 40,
        backgroundColor: "#FFB6C1",
    },
    loginBtn: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0.2,0.2)',
        width: "30%",
        borderRadius: 45,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#F08080",

    },
    loginBtn1: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0.2,0.2)',
        width: "35%",
        borderRadius: 45,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 50,
        marginTop: 20,
        backgroundColor: "#F08080",
    }
});