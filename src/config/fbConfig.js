import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyCheMp7e_zgu4cQJ6QX2XbvMfvW32q7hPA",
  authDomain: "frtemp-be50f.firebaseapp.com",
  databaseURL: "https://frtemp-be50f.firebaseio.com",
  projectId: "frtemp-be50f",
  storageBucket: "frtemp-be50f.appspot.com",
  messagingSenderId: "246833965727",
  appId: "1:246833965727:web:5714e871d25ef40f8150aa",
  measurementId: "G-RS97FE4P1F",
}
// Initialize Firebase

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export { storage, firebase as default }
