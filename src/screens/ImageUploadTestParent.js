import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Header from './Appbar'
import ImageUpload from './ImageUpload'
const ImageUploadTestParent = ({ navigation }) => {
    const [Image, setImage] = useState(null);
    const [uploadFlag, setuploadFlag] = useState(false);

    const displayImage = () => {
        console.log(Image)
    }

    const uploadImage = (image) => {
        // console.log("custom:",image)
        setImage(image);
        // displayImage()
    }

    const toggleUploadFlag=()=>{
        setuploadFlag(prev=> !prev)
    }

    if (!uploadFlag) {//show parent
        return (
            <View>
                <Header title={"testComponent"}></Header>
                
                <TouchableOpacity onPress={()=>toggleUploadFlag()}>
                    <Text>{"Click"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>displayImage()}>
                    <Text>{"Second"}</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <ImageUpload _firstButtonContent={"Pick Image"} _secondButtonContent="Upload Image" _parentImageSetter={uploadImage} _toggleButton={toggleUploadFlag} />
        )
    }
    
}

export default ImageUploadTestParent