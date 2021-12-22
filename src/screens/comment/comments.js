import React, { useEffect, useState } from "react";
import { TextInput } from 'react-native';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import { db } from "../../../firebase-config";
import { collection, doc, getDocs, updateDoc, query, } from "firebase/firestore"
import { useIsFocused } from "@react-navigation/native";

const SPACING = 20;
const AVATAR_SIZE = 50;

export default function CommentScreen({ route, navigation }) {
    const isFocused = useIsFocused(); //for update of state variables
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

    const getPost = async () => {

        const q = query(postCollectionRef);
        const getResult = await getDocs(q)
        getResult.forEach((doc) => {
            if (doc.id == postId) {
                console.log(doc.data())
                setBudget(doc.data().budget)
                setLocation(doc.data().location)
                setDays(doc.data().days)
                setDesc(doc.data().description)
                setUid(doc.data().uid)
                let intermediateList = []
                doc.data().comments.map((item, index) => {
                    intermediateList.push({ "data": item, "id": index })
                })
                setComments(intermediateList);
            }
        });
    }
    useEffect(() => {
        getPost()
        if (isFocused) {
            getPost()
        }
    }, [isFocused])


    function ViewP(id) {
        navigation.navigate('report', {
            userId: userId,
            repId: id
        })
    }

    const getPreviousComment=async ()=>{
        let refinedComment=[]
        for(let i=0;i<comments.length;i++){
            refinedComment.push({"comment_text":comments[i].data.comment_text,"uid":comments[i].data.uid})
        }
        return refinedComment;
    }


    const comFtn = async () => {

        console.log(postId)
        const UpdateComment = async () => {
            
            let prevComment = await getPreviousComment();
            prevComment.push({ "comment_text": com, "uid": uid })
            await updateDoc(doc(db, "post", postId), {
                comments: prevComment
            });
        }
        await UpdateComment()
        getPost();
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 30, marginBottom: 40, marginLeft: 30, width: "80%", height: "28%", borderColor: "#F08080" }}>
                <TouchableOpacity onPress={(() => ViewP(item.uid))}>
                    <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 100, marginBottom: 5 }}>{uid}</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 18, opacity: .7, marginLeft: 25, marginBottom: 5 }}>Going to :{" "}{location}</Text>
                <Text style={{ fontSize: 18, opacity: .7, marginLeft: 25, marginBottom: 5 }}>Trip Budget:{" "}{budget}</Text>
                <Text style={{ fontSize: 18, opacity: .7, marginLeft: 25, marginBottom: 5 }}>Trip Days:{" "}{days}</Text>
                <Text style={{ fontSize: 20, opacity: .8, marginLeft: 25, color: '#DC143C' }}>{desc}</Text>
            </View>
            <Text style={{ marginLeft: 120, marginTop: -20, fontSize: 20, color: "#DC143C" }}>Comments:</Text>

            <FlatList
                data={comments}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    padding: SPACING
                }}


                renderItem={({ item, index }) => {
                    return <View style={{
                        flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'lightgrey',
                        borderRadius: 16, shadowColor: 'lightgrey', shadowOffset: {
                            width: 0, height: 10
                        },
                        shadowOpacity: .5, shadowRadius: 20
                    }}>
                        {comments.length > 1 ?
                            <View>
                                <Text style={{ fontSize: 18, opacity: .7 }}>From :{" "}{item.data.uid}</Text>
                                <Text style={{ fontSize: 18, opacity: .7 }}>Said:{" "}{item.data.comment_text}</Text>
                            </View>
                            :
                            <View>
                                <Text style={{ fontSize: 18, opacity: .7 }}> {"No Comments be the first..."} </Text>
                            </View>
                        }

                    </View>
                }}
            />

            <TextInput style={{ width: "70%", height: 80, marginLeft: 50, borderWidth: 2, padding: 10, borderColor: '#DC143C', borderRadius: 10 }}
                placeholder="Type Comment"
                onChangeText={value => setCom(value)}
            />

            <TouchableOpacity style={styles.loginBtn} onPress={comFtn}>
                <Text>Submit Comment</Text>
            </TouchableOpacity>

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
        width: "40%",
        borderRadius: 45,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 100,
        marginTop: 20,
        backgroundColor: "#F08080",
        flexDirection: "row"

    },
    loginBtn1: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0.2,0.2)',
        width: "90%",
        borderRadius: 15,
        height: 70,
        marginLeft: 10,
        marginTop: 10,
        flexDirection: "row",
        backgroundColor: "#F08080",
    }
});