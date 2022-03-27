import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  //replace with ImagePicker

export default function ImageUpload({route,navigation,_firstButtonContent,_secondButtonContent,_parentImageSetter,_toggleButton}) {
    const [image, setImage] = useState(null);

    const permissionTrigger = () => {//ask permission for imagelibrary
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        // console.log(result);

        if (!result.cancelled) {
            let imageString = 'data:image/png;base64,' + result.base64
            // console.log(imageString)
            setImage(imageString);
        }
    };

    const handlePickedImage = () => {
        //pass parent function here ,to change state of parent component. setImageB64(image)
        _parentImageSetter(image) //passed base64Url encoded to parent
        _toggleButton();
        console.log("handle picked image")
    }

    useEffect(() => {
        permissionTrigger()
    }, []);



    if (image) { //image is picked
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <View style={{marginTop:5}}>
                    <TouchableOpacity style={styles.ButtonElement} onPress={() => handlePickedImage()}>
                        <Text style={styles.ButtonFont}>{_secondButtonContent}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {//image is still not picked
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.ButtonElement} onPress={() => pickImage()}>
                    <Text style={styles.ButtonFont}>{_firstButtonContent}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    ButtonElement: {
        backgroundColor: "#55a7fa",
        padding: 8,
        borderRadius: 5,
    },
    ButtonFont: {
        color: "white"
    }
})