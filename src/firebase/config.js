import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { continueStatement } from '@babel/types';

const firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: "playlist-vue-project-a4e60.firebaseapp.com",
    projectId: "playlist-vue-project-a4e60",
    storageBucket: "playlist-vue-project-a4e60.appspot.com",
    messagingSenderId: "86661899605",
    appId: "1:86661899605:web:2369e2cb358a762a3c3bdc"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firebase
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }