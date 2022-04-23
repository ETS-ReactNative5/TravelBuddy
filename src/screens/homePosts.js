import React from "react";
import {Text} from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { DrawNavg, Tabs } from "./NavigationBar";

export default function Home(){
    //displaying the tab navigator once we login to the app
    //login directs to this component and then tab navigator uses posts home feed component as default to display initially
    return (
        // <Text>
        //     {"Inside home post screen"}
        // </Text>
        <NavigationContainer independent={true}>
            <DrawNavg />
        </NavigationContainer>
    )
}