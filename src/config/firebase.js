import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
const firebaseConfig = {
    apiKey: "AIzaSyDBv9DyV6BVShkL3TB5ugl3qMKzQYELuVw",
    authDomain: "file-management-system-13940.firebaseapp.com",
    projectId: "file-management-system-13940",
    storageBucket: "file-management-system-13940.appspot.com",
    messagingSenderId: "1092313558090",
    appId: "1:1092313558090:web:4156a4db9ea71b81964ab3"
};

const fire = firebase.initializeApp(firebaseConfig);

 export default fire;

