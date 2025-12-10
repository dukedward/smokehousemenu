// src/firebaseConfig.js
// npm install firebase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5MTLwFCWQXm_uw_0ALTCsgCeB0z_o56Q",
    authDomain: "theforkofit.firebaseapp.com",
    projectId: "theforkofit",
    storageBucket: "theforkofit.appspot.com",
    messagingSenderId: "981864557134",
    appId: "1:981864557134:web:702dbc62de2086c458b11f",
    measurementId: "G-E3T0QXDNXL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);