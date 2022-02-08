import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyASif7WdErjZqgvFacp18DzxLAmxa-2DyE",
    authDomain: "mini-image-community.firebaseapp.com",
    projectId: "mini-image-community",
    storageBucket: "mini-image-community.appspot.com",
    messagingSenderId: "97193223007",
    appId: "1:97193223007:web:fcf9c518e6278dc3a04cea",
    measurementId: "G-6L1DVJYKPR"
};


firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export { auth, apiKey, firestore, storage };