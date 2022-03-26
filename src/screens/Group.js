import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

import Header from "./Appbar"

const Group = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title={"Group"}></Header>
            <TouchableOpacity onPress={() => navigation.navigate("chat")}><Text>{"clicked"}</Text></TouchableOpacity>
        </View>
    )
}

export default Group

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
  })