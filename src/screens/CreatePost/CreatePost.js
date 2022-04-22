import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback,Text,Image as UImage } from 'react-native'

//changing dependancies
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageUpload } from '../ImageUpload';
import { PostBody } from '../Post';
import { PersistanceHandler } from '../../../PersistanceHandler/Store';
import { getStorage as AsyncStateStore } from '../../../StateStorage';
import { Loader } from '../Loader/Loader';
// import { savePost } from '../../Manager/BLogic';

const CreatePostHeader = ({ _imageUrl,_Name }) => {
    return (
      <View>
  
        <View style={
          {
            flexDirection: 'row',
            margin: 5,
            alignItems: 'center'
          }
        }>
          <UImage source={{ uri: _imageUrl }} style={styles.story} ></UImage>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            <Text style={{ color: "black", marginLeft: 5, fontWeight: '700' }}>{_Name}</Text>
            <Text style={{ color: "black", marginLeft: 5, fontWeight: '500' }}>{"Share your experience.. "}</Text>
          </View>
        </View>
      </View>
    )
}

export const CreatePost = ({ navigation }) => {
    const scrollViewRef = useRef();
    const [Image, setImage] = useState(null);
    const [uploadFlag, setuploadFlag] = useState(false);
    const [TextValue, setTextValue] = useState("");
    const [PostData, setPostData] = useState({ bodyContent: TextValue, assets: [] });
    const [UserData, setUserData] = useState(null);

    const uploadImage = (image) => {//pass to ImageUpload as prop to handle imageSet.
        setImage(image);
        if (image) {
            setPostData(prev => {
                let obj = { imageUrl: image }
                prev.assets = []
                prev.assets.push(obj)
                return prev;
            })
        }
    }

    const toggleUploadFlag = () => {//pass to ImageUpload as prop to handle toggle for display.
        setuploadFlag(prev => !prev)
    }

    const savePost = async (_text1,_text2) => {
        console.log(_text1,_text2)
    }

    const submitPost = () => {
        savePost(TextValue.toString(), Image)
    }

    useEffect(async () => {
        setUserData(await AsyncStateStore("UserData"))
    }, [])

    if (UserData) {
        if (!uploadFlag) {//show parent
            return (
                // <View>
                // <Header title={"CreatePost"}></Header>
                <KeyboardAvoidingView keyboardVerticalOffset={100}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View styles={styles.inner}>
                            <Text>{"\n"}</Text>
                            <CreatePostHeader _imageUrl={UserData.image} _Name={UserData.name}></CreatePostHeader>
                            <ScrollView
                                ref={scrollViewRef}
                                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                            >
                                <View style={styles.createPostContainer}>
                                    <PostBody post={PostData} />
                                    <View style={styles.textInput}>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <ScrollView>
                                                <View style={{ height: 50 }}>
                                                    <TextInput value={TextValue} multiline={true} numberOfLines={2}
                                                        onChange={(e) => {
                                                            let tempo = e.nativeEvent.text
                                                            setTextValue(tempo)
                                                            setPostData(prev => {
                                                                prev.bodyContent = tempo
                                                                return prev;
                                                            })
                                                        }}
                                                        placeholder="Share your travel experience..." style={{ flex: 100, display: "flex" }} />
                                                </View>
                                            </ScrollView>
                                            <Icon
                                                name='image'
                                                type='ion-icon'
                                                color='#517fa4'
                                                onPress={() => toggleUploadFlag()}
                                            />
                                            <Icon
                                                name='send'
                                                type='ion-icon'
                                                color='#517fa4'
                                                onPress={() => submitPost()}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                // </View>
            )
        } else {
            return (
                <ImageUpload _firstButtonContent={"Pick Image"} _secondButtonContent="Upload Image" _parentImageSetter={uploadImage} _toggleButton={toggleUploadFlag} />
            )
        }
    } else {
        return <Loader></Loader>
    }

}


const styles = StyleSheet.create({
    container: { flex: 1 },
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
        justifyContent: "space-around",
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
        marginBottom: 3,
        backgroundColor: "white"
    },
    btnContainer: {
        backgroundColor: "red",
        color: "red"
    },
    createPostContainer: {
        backgroundColor: "#F1F0FF",
        padding: 2,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#f7f5df",
        minHeight: 220,
        display: "flex",
        justifyContent: "space-between",
        margin: 4

    }
})
