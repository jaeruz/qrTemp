import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
// import "firebase/storage"


var firebaseConfig = {
    apiKey: "AIzaSyBheMT43kP_93XCJx92L5MTt0nXdZiXwj8",
    authDomain: "temployee-497c5.firebaseapp.com",
    databaseURL: "https://temployee-497c5.firebaseio.com",
    projectId: "temployee-497c5",
    storageBucket: "temployee-497c5.appspot.com",
    messagingSenderId: "834949661017",
    appId: "1:834949661017:web:b445ed7cc5bcea6af4cc48",
    measurementId: "G-VJ5Q1PTQ6H"
};
// Initialize Firebase

// firebase.analytics();

firebase.initializeApp(firebaseConfig)

export default firebase;