import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
//external dependancies
import { Swing } from "react-native-animated-spinkit";

export const Loader = () => {
    return (
        <View style={styles.container}>
            <Swing size={48} color="#6c63ff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
  })