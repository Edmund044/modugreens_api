var admin = require("firebase-admin");
const serviceAccount = require('./modugreens-firebase-adminsdk-1b0v5-f54222ef6e.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://modugreens-default-rtdb.firebaseio.com",
  storageBucket: process.env.STORAGE_BUCKET
});
const db = admin.firestore();    
db.collection('crops').get()
        .then( (doc)=>{
            if(!doc.exists){
                console.log("No document exists");

            }
            else{
                res.json(doc);
              //  console.log(doc);
            }

        })
        .catch((error)=>{
          console.log(error);
        });
//module.exports = firebase;