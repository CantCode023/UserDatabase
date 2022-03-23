import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD2as5RaQC7DRyLUtYgxn640s6FmE3qgwo",
    authDomain: "cloud-testing-1-7ad5d.firebaseapp.com",
    projectId: "cloud-testing-1-7ad5d",
    storageBucket: "cloud-testing-1-7ad5d.appspot.com",
    messagingSenderId: "1005123052950",
    appId: "1:1005123052950:web:b8e943d610929fa7a1a9b7"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;