// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEd2KwDIdfucbrovgYCdt2hoFeO26oesQ",
  authDomain: "site-5c959.firebaseapp.com",
  projectId: "site-5c959",
  storageBucket: "site-5c959.firebasestorage.app",
  messagingSenderId: "598016772002",
  appId: "1:598016772002:web:7854801456128b1a2c14fb",
  measurementId: "G-WZ91ED1YX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);