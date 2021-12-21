import React from "react";
import { View, StyleSheet, TouchableHighlight,TouchableOpacity, Animated } from "react-native";
import { FontAwesome5,FontAwesome, Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function AddButton(){
    mode = new Animated.Value(0);
    buttonSize = new Animated.Value(1);
    const navigation = useNavigation();

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(buttonSize, {
                toValue: 0.95,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(buttonSize, {
                toValue: 1,
                useNativeDriver: false
            }),
            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                useNativeDriver: false
            })
        ]).start();
    };

        const thermometerX = mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -100]
        });

        const thermometerY = mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const timeX = mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -24]
        });

        const timeY = mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -150]
        });

        const pulseX = mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, 50]
        });

        const pulseY = mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const rotation = mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
        });

        const sizeStyle = {
            transform: [{ scale: buttonSize }]
        };

        return (
            <View style={{ position: "absolute", alignItems: "center" }}>
                <Animated.View style={{ position: "absolute", left: thermometerX, top: thermometerY }}>
                    <View style={styles.secondaryButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('/')} >
                    <FontAwesome name="question" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
                    <View style={styles.secondaryButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('post')} >
                    <MaterialIcons name="post-add" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.View style={{ position: "absolute", left: pulseX, top: pulseY }}>
                    <View style={styles.secondaryButton}>
                    <FontAwesome name="group" size={24} color="black" />
                    </View>
                </Animated.View>
                <Animated.View style={[styles.button, sizeStyle]}>
                    <TouchableHighlight onPress={handlePress} underlayColor="#F08080">
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <FontAwesome5 name="plus" size={24} color="#FFF" />
                        </Animated.View>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        );
    
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#F08080",
        position: "absolute",
        marginTop: -60,
        shadowColor: "#F08080",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#F08080"
    }
});