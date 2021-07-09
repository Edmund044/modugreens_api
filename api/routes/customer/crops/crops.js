const express = require('express');
const app = express();

require('dotenv').config();
const admin = require('../../../../firebase/database');
const db = admin.firestore();


//get about 
app.get("/crops",async (req,res,next)=>{
    let about=[]
   const about_info = await db.collection('crops')
        .get();
        if (snapshot.docs.length > 0) {
          for (const info of snapshot.docs) {
           about.push(info.data())
           
        }}
        res.json(about);
 

});
//post about
app.post("/about",async (req,res,next) =>{
    let docref = await db.collection("about")
        .add({
          sth :req.body.about.sth,
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
//update about
app.put("/about/:id",async (req,res,next)=>{
  let docref =  db.collection("about").doc(req.body.user.name);
  await docref
        .update({
         sth:req.body.about.sth
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
//delete about
app.delete("/about:id",async (req,res,next) =>{
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