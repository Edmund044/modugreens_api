const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyALR1DkAgjaoEmak1UVAvSxkfbG4zOSjxo",
    authDomain: "modugreens.firebaseapp.com",
    databaseURL: "https://modugreens-default-rtdb.firebaseio.com",
    projectId: "modugreens",
    storageBucket: "modugreens.appspot.com",
    messagingSenderId: "830310619902",
    appId: "1:830310619902:web:ea0cccf4f0067d100163af",
    measurementId: "G-TZKY211NZR"
  };
  firebase.initializeApp(firebaseConfig);  
  
  module.exports = firebase;