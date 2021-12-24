// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe-R0ygR4Mr60ZuQdpoDPMbLNGVGZT85s",
  authDomain: "travel-3a80a.firebaseapp.com",
  projectId: "travel-3a80a",
  storageBucket: "travel-3a80a.appspot.com",
  messagingSenderId: "999897388663",
  appId: "1:999897388663:web:3c4f9c4b5408e89b951872",
  measurementId: "G-CEGDYP4GFS"
};
// Initialize Firebase

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const auth = firebase.auth()

export {auth};


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDe-R0ygR4Mr60ZuQdpoDPMbLNGVGZT85s",
//   authDomain: "travel-3a80a.firebaseapp.com",
//   projectId: "travel-3a80a",
//   storageBucket: "travel-3a80a.appspot.com",
//   messagingSenderId: "999897388663",
//   appId: "1:999897388663:web:3c4f9c4b5408e89b951872",
//   measurementId: "G-CEGDYP4GFS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
