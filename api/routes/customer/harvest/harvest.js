const express = require('express');
const app = express();

require('dotenv').config();
const admin = require('../../../../firebase/database');
const db = admin.firestore();


//get data 
app.get("/harvests",async (req,res,next)=>{
    let data=[]
   const data_info = await db.collection('harvest')
        .get()
        .then( (snapshot) => {
            if (snapshot.docs.length > 0) {
                for (const info of snapshots.docs) {
                 data.push(info.data())
                 
              }}
              res.status(200).json(data);           
        }
          
        )
        .catch(
           error => {
             res.status(500).json({error:error})                   
           }
            
        );
 

});
//post data
app.post("/harvests",async (req,res,next) =>{
    let docref = await db.collection("data")
        .add({
          sth :req.body.data.sth,
            })
        .then(
           (snapshot) => {
            res.status(200).json({message:"Done"});
           } 
         
        )
        .catch(
            error => {
                res.status(500).json({error:error})                   
              }
        );

});
//update data
app.put("/harvests/:id",async (req,res,next)=>{
  let docref =  db.collection("data").doc(req.body.user.name);
  await docref
        .update({
         sth:req.body.data.sth
                })
        .then(
           (snapshot) => {
             res.status(200).json({message:"Done"});
               } 
            )
        .catch(
            error => {
            res.status(500).json({error:error})                   
               }
              );        
 
});
//delete data
app.delete("/harvests/:id",async (req,res,next) =>{
    await db.collection()
        .doc(req.body.id)
        .delete()
        .then(
            (snapshot) => {
             res.status(200).json({message:"Done"});
            } 
          
         )
         .catch(
             error => {
                 res.status(500).json({error:error})                   
               }
         );
  
});

module.exports = app;