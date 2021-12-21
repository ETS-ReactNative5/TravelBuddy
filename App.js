import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppNavigator from "./src/navigation/navigation";

export default function App() {
  return (
    <AppNavigator />
  );
}


// const UpdateComment = async (id) => {
//   let prevComment=Post[1].data.comments  //change to array of posts.
//   prevComment.push({"UserID":ID,"comment":Comment})
//   await updateDoc(doc(db, "post",id), {
//       comments: prevComment
//   });
  