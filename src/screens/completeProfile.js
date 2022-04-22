import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity, Animated, Text, Image, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView
} from "react-native";
//external dependancies
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, Button, } from 'react-native-elements';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Controller } from "../../BLogic/Controller";
import { authUpdate } from "../../firebase/firebase-config";
import { ImageUpload } from "./ImageUpload"
// import { StatusBar } from "expo-status-bar";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator, Header } from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/FontAwesome';

var keyboardH = 0

if (Platform.OS === 'ios') {
  keyboardH = 1
} else {
  keyboardH = -400
}

/**
 * after signup(register identity of user) - the user redirect to this screen where the app get additional information from user
 * required for tourism purpose.
 */
export default function CompleteProfile({ navigation }) {
  const [Name, setName] = useState("");
  const [Gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [Address, setAddress] = useState("");
  const [Profession, setProfession] = useState("");
  const [Contact, setContact] = useState("");
  const [Hobbies, setHobbies] = useState("");

  //for handling of image.
  const [Image, setImage] = useState("https://firebasestorage.googleapis.com/v0/b/travel-3a80a.appspot.com/o/UserData%2Ftw1pFZ6xSVRULAkxO3laPsz8iNY2?alt=media&token=026977fd-5acd-4960-876a-003ecfc161b8 tw1pFZ6xSVRULAkxO3laPsz8iNY2");
  const [uploadFlag, setuploadFlag] = useState(false);
  //date handling
  const [date, setDate] = useState(new Date());
  const [DateShowFlag, setDateShowFlag] = useState(false);

  const handleSubmit = async () => {
    const _uid = authUpdate.currentUser.uid;
    let obj = new Controller();
    await obj.detailInformation(Name, Gender, DOB, Address, "", Contact, Hobbies, "", Image, _uid)
    navigation.navigate("deleteit");
  }


  const uploadImage = async (_image) => {//pass to ImageUpload as prop to handle imageSet.
    let obj = new Controller();
    const _uid = authUpdate.currentUser.uid;
    let url = await obj.uploadAvatarImageDB(_image, _uid)  //upload image to firebase and get the url that is going to be updated.
    setImage(url);
  }

  const toggleUploadFlag = () => {//pass to ImageUpload as prop to handle toggle for display.
    setuploadFlag(prev => !prev)
  }

  const onChangeDate = (event, selectedDate) => {
    console.log("changeDate Trigger", selectedDate)
    const currentDate = selectedDate ? selectedDate : new Date();
    setDateShowFlag(false);
    setDate(prev => {
      setDOB(currentDate)
      return currentDate
    });
  };

  const showDatepicker = () => {
    setDateShowFlag(true);
  };


  useEffect(async () => {

  }, [])

  if (!uploadFlag)
    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardH}>
        <TouchableOpacity style={{ marginTop: 50, marginLeft: 10 }}
          onPress={() => navigation.navigate('register')}
        >
          <Ionicons name="arrow-back-sharp" size={24} color="#6c63ff" />
        </TouchableOpacity>
        <ScrollView style={{ backgroundColor: 'white', marginBottom: 70 }}>
          <View style={{ paddingVertical: 15 }}>
            <Text style={{ fontSize: 30, color: '#6c63ff', marginBottom: 50, marginLeft: 10, fontWeight: 'bold' }}>Complete Profile</Text>
            <TouchableOpacity onPress={() => toggleUploadFlag()}>
              {Image ? <PostImage _imageUrl={Image} /> :
                <MaterialIcons name="add-a-photo" size={30} color="#6c63ff" style={{ marginLeft: 50 }} />}
              <Text style={{ marginBottom: 18, marginLeft: 16, color: '#6c63ff', fontSize: 15 }}>Add Profile Image</Text>
            </TouchableOpacity>

            <Input
              label="Name"
              value={Name}
              onChangeText={value => setName(value)}
            />
            <Input
              label="Phone Number"
              keyboardType="phone-pad"
              maxLength={11}
              value={Contact}
              onChangeText={value => setContact(value)}
            />

            <TouchableOpacity onPress={() => showDatepicker()}>
              <Input
                label="Date"
                value={date.toDateString()}
                disabled={true}
              />
            </TouchableOpacity>

            {DateShowFlag && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                dateFormat={"day month year"}
                onChange={onChangeDate}
                maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                minimumDate={new Date("1850-03-28")}
              />
            )}

            <Input
              label="Location"
              value={Address}
              onChangeText={value => setAddress(value)}
            />

            <Input
              label="Gender"
              value={Gender}
              onChangeText={value => setGender(value)}
            />
            <Input
              label="Hobbies"
              value={Hobbies}
              onChangeText={value => setHobbies(value)}
            />
            <TouchableOpacity style={styles.loginBtn} onPress={() => handleSubmit()}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e5e5e5' }}>Finish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  else return (
    <ImageUpload _firstButtonContent={"Pick Image"} _secondButtonContent="Upload Image" _parentImageSetter={uploadImage} _toggleButton={toggleUploadFlag} />
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
    width: "60%",
    borderRadius: 5,
    height: 50,
    marginLeft: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#6c63ff",

  },
})


const PostImage = ({ _imageUrl }) => (
  <View style={{ width: '50%', height: 100, marginBottom: 5, marginLeft: 5 }}>
    <Image
      source={{ uri: _imageUrl }}
      style={{ height: '100%', resizeMode: 'cover' }}
    />
  </View>
)


