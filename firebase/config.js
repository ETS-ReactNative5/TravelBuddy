// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';


// import firebase from 'firebase/compat/app';
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

// Initialize Firebase  --- as per previous version
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app();
// }
// const authHandler = firebase.auth()
//--------------------------------------removing this previous version


//for version 9
const appUpdate=initializeApp(firebaseConfig);
const authUpdate = getAuth(appUpdate);

export {authUpdate,firebaseConfig};
//as per version 9
// const app = initializeApp(firebaseConfig);
// const authHandler=getAuth(app);
// export {authHandler};
// const analytics = getAnalytics(app);