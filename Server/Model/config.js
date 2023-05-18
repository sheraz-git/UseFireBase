const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");
firebaseConfig = {
  apiKey: "AIzaSyAYzEKfBTN2VdXthLKn9ml7LCz9OD0xqbg",
  authDomain: "mmm-solution-7aa8a.firebaseapp.com",
  projectId: "mmm-solution-7aa8a",
  storageBucket: "mmm-solution-7aa8a.appspot.com",
  messagingSenderId: "117326586577",
  appId: "1:117326586577:web:00b15ab243f7c5599ddbf0",
  measurementId: "G-GKD1Z5Y6N4"
};
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore(); 
const User=db.collection("Users");
module.exports = User;