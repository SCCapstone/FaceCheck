import * as firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyBdXrOOzC_PZx4SeDH5WzMmYsnmbRd4NHo",
  authDomain: "facecheck-f1a51.firebaseapp.com",
  databaseURL: "https://facecheck-f1a51.firebaseio.com",
  projectId: "facecheck-f1a51",
  storageBucket: "facecheck-f1a51.appspot.com",
  messagingSenderId: "658389282843",
  appId: "1:658389282843:web:c85b82fa317bc5ae5308be",
  measurementId: "G-NHQF0Z8RZ4"
};

const settings = {timestampsInSnapshots: true};

let Firebase = firebase.initializeApp(firebaseConfig)

Firebase.firestore().settings(settings);

export default Firebase;