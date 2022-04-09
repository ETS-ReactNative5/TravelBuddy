import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, } from 'react-native'
import Header from './Appbar'
import ImageUpload from './ImageUpload'
import { Icon } from 'react-native-elements';

//changing dependancies
import { PostBody } from './post'  //this path will be changed
import { savePost} from '../Manager/BLogic';


const PostCreator = ({ navigation }) => {
    const [Image, setImage] = useState(null);
    const [uploadFlag, setuploadFlag] = useState(false);
    const [TextValue, setTextValue] = useState("");
    const [PostData, setPostData] = useState({ bodyContent: TextValue, assets: [] });

    const displayImage = () => {
        console.log(Image)
    }

    const uploadImage = (image) => {//pass to ImageUpload as prop to handle imageSet.
        setImage(image);
        if(image){
            setPostData(prev=>{
                let obj={imageUrl:image}
                prev.assets=[]
                prev.assets.push(obj)
                return prev;
            })
        }
    }

    const toggleUploadFlag = () => {//pass to ImageUpload as prop to handle toggle for display.
        setuploadFlag(prev => !prev)
    }

    const submitPost=()=>{
        savePost(TextValue.toString())
    }

    if (!uploadFlag) {//show parent
        return (
            <View>
                <Header title={"CreatePost"}></Header>

                <TouchableOpacity onPress={() => toggleUploadFlag()}>
                    <Text>{"Click"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => displayImage()}>
                    <Text>{"Second"}</Text>
                </TouchableOpacity>

                <View style={styles.createPostContainer}>
                    <PostBody post={PostData} />
                    <View style={styles.textInput}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <TextInput value={TextValue} multiline={true}
                                onChange={(e) => {
                                    let tempo = e.nativeEvent.text
                                    setTextValue(tempo)
                                    setPostData(prev => {
                                        prev.bodyContent = tempo
                                        return prev;
                                    })
                                }
                                }
                                placeholder="Share your travel experience..." style={{ flex: 100, display: "flex" }} />
                            <Icon
                                name='send'
                                type='ion-icon'
                                color='#517fa4'
                                onPress={() => submitPost()}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <ImageUpload _firstButtonContent={"Pick Image"} _secondButtonContent="Upload Image" _parentImageSetter={uploadImage} _toggleButton={toggleUploadFlag} />
        )
    }

}


const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    keyboardContainer: {
        flex: 1
    },
    inner: {
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        // height: 40,
        borderColor: "#000000",
        margin: 1,
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        marginBottom: 3
    },
    btnContainer: {
        backgroundColor: "red",
        color: "red"
    },
    createPostContainer:{
        backgroundColor:"#fffef2",
        padding:2,
        borderWidth:2,
        borderRadius:15,
        borderColor:"#f7f5df",
        minHeight:220,
        display:"flex",
        justifyContent:"space-between",
        margin:4

    }
})

export default PostCreator