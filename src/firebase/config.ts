// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkgTH_XRppKZVVuLkY3lWVfeP96LypP9I",
  authDomain: "murgaplayer.firebaseapp.com",
  projectId: "murgaplayer",
  storageBucket: "murgaplayer.appspot.com",
  messagingSenderId: "474673829281",
  appId: "1:474673829281:web:2702034afc06a6a702e7e0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GithubAuthProvider();
export const db = getFirestore(app)

provider.setCustomParameters({
  'allow_signup': 'false'
});