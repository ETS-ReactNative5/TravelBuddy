// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = { //nabeel noor
  apiKey: "AIzaSyDe-R0ygR4Mr60ZuQdpoDPMbLNGVGZT85s",
  authDomain: "travel-3a80a.firebaseapp.com",
  projectId: "travel-3a80a",
  storageBucket: "travel-3a80a.appspot.com",
  messagingSenderId: "999897388663",
  appId: "1:999897388663:web:3c4f9c4b5408e89b951872",
  measurementId: "G-CEGDYP4GFS"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA_H1Xxnyv__eKTZC7MoDHe4332AgnmIBY",
//   authDomain: "fypfinal-f5119.firebaseapp.com",
//   databaseURL: "https://fypfinal-f5119-default-rtdb.firebaseio.com",
//   projectId: "fypfinal-f5119",
//   storageBucket: "fypfinal-f5119.appspot.com",
//   messagingSenderId: "470117626133",
//   appId: "1:470117626133:web:51dd51d755403e34f1b91c",
//   measurementId: "${config.measurementId}"
// };
