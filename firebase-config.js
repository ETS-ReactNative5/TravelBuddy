// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_H1Xxnyv__eKTZC7MoDHe4332AgnmIBY",
  authDomain: "fypfinal-f5119.firebaseapp.com",
  databaseURL: "https://fypfinal-f5119-default-rtdb.firebaseio.com",
  projectId: "fypfinal-f5119",
  storageBucket: "fypfinal-f5119.appspot.com",
  messagingSenderId: "470117626133",
  appId: "1:470117626133:web:51dd51d755403e34f1b91c",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase

// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth()

// export {auth};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);