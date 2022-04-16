import 'react-native-reanimated'
import React, { useState } from "react";
import AppNavigator from "./src/navigations/navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
