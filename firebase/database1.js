const firebase = require('firebase');
const app = firebase.initializeApp({
    apiKey: "AIzaSyALR1DkAgjaoEmak1UVAvSxkfbG4zOSjxo",
    authDomain: "modugreens.firebaseapp.com",
    databaseURL: "https://modugreens-default-rtdb.firebaseio.com",


});

module.exports = app;