import { firebaseConfig } from "../../config";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

firebase.initializeApp(firebaseConfig);

export { firebase };