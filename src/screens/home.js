import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./tab"

export default function Home(){
    return (
        <NavigationContainer independent={true}>
            <Tabs />
        </NavigationContainer>
    )
}