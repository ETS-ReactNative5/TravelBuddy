import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref } from "firebase/storage";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const storage = getStorage();

;   // false 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
      // Create a reference to 'mountains.jpg'
// const mountainsRef = ref(storage, image);

// // Create a reference to 'images/mountains.jpg'
// // const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// // While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
    </View>
  );
}