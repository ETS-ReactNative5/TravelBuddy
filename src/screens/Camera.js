import React from 'react'
import { View, Text,TouchableOpacity, Touchable } from 'react-native'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Header from './Appbar';

const Camera = () => {
    const testCamera=async ()=>{
        const result = await launchCamera({cameraType:"back"});
    }

    const testImagePicker=async ()=>{
        const result = await launchCamera();
    }

    return (
        <View>
            <Header title="ImageTesting"></Header>
            <TouchableOpacity onPress={()=>{
                testCamera()
            }}>
            <Text>{"OpenCamera"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Camera