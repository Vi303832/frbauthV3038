
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDTa1Xra4PWZbmDx7VyR4LQQHHi5-Iipvs",
    authDomain: "mini-blog-9dc96.firebaseapp.com",
    projectId: "mini-blog-9dc96",
    storageBucket: "mini-blog-9dc96.firebasestorage.app",
    messagingSenderId: "470481713841",
    appId: "1:470481713841:web:6dffc7e687d46c7f360090"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);