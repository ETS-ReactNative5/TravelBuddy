import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppNavigator from "./src/navigation/navigation";
import Testo from "./test";
export default function App() {
  return (
    <Testo></Testo>
  );
}


// const UpdateComment = async (id) => {
//   let prevComment=
//   prevComment.push({"UserID":ID,"comment":Comment})
//   await updateDoc(doc(db, "post",id), {
//       comments: prevComment
//   });
  