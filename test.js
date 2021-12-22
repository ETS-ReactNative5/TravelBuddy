import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppNavigator from "./src/navigation/navigation";
import ImagePicker from 'react-native-image-picker';


export default function Testo() {

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const uri = response.uri;
      this.setState({
        selectedPictureUri: uri,
      });
    }
  });
  
  return (
    <Text>hello</Text>
    // <AppNavigator />
  );
}


// const UpdateComment = async (id) => {
//   let prevComment=
//   prevComment.push({"UserID":ID,"comment":Comment})
//   await updateDoc(doc(db, "post",id), {
//       comments: prevComment
//   });
  