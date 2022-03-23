import React from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';

const Comments = ({navigation}) => {

    return (
        <View>
            <Text>{"Comments component"}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("main")}> 
                <Text>{"Click me"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Comments;
