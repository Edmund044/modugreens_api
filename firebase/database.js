var firebase = require('firebase-admin');
var app = firebase.initializeApp({  
    apiKey: "AIzaSyALR1DkAgjaoEmak1UVAvSxkfbG4zOSjxo",
    authDomain: "modugreens.firebaseapp.com",
    projectId: "modugreens",
    storageBucket: "modugreens.appspot.com",
    messagingSenderId: "830310619902",
    appId: "1:830310619902:web:ea0cccf4f0067d100163af",
    measurementId: "G-TZKY211NZR"

});
module.exports = firebase;