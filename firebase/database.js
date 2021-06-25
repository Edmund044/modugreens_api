const admin = require('firebase-admin');

const serviceAccount = require('./firebase-permission.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quick-garage-api-default-rtdb.firebaseio.com",
    storageBucket: process.env.STORAGE_BUCKET
});

module.exports = admin;