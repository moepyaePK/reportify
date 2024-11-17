// // src/firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDR0aXFGqxMQWwM8UX_SicyMlylAtSsCfk",
//   authDomain: "reportify-11720.firebaseapp.com",
//   projectId: "reportify-11720",
//   storageBucket: "reportify-11720.firebasestorage.app",
//   messagingSenderId: "824944775108",
//   appId: "1:824944775108:web:b46816af4dc132a8329e91",
//   measurementId: "G-K4FWQEJR1Z"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };

// src/firebaseconfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDR0aXFGqxMQWwM8UX_SicyMlylAtSsCfk",
    authDomain: "reportify-11720.firebaseapp.com",
    projectId: "reportify-11720",
    storageBucket: "reportify-11720.firebasestorage.app",
    messagingSenderId: "824944775108",
    appId: "1:824944775108:web:b46816af4dc132a8329e91",
    measurementId: "G-K4FWQEJR1Z"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
