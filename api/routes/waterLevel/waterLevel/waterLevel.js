const express = require('express');
const app = express();

require('dotenv').config();
const admin = require('../../../../firebase/database');
const db = admin.firestore();


//get about 
app.get("/waterLevel",async (req,res,next)=>{
  const snapshot = await db.collection("waterLevel")
                  .get()
                  .then( (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({ id:doc.id,...doc.data() }));
                    res.status(200).json(data); 
                    console.log(data);
                  }
                   
                  )
                  .catch( 
                    error => {
                    res.status(500).json({error:error})                   
                  });
});
//get about 
app.get("/waterLevel/:id",async (req,res,next)=>{
  const id = req.params.id;
  console.log(id);
  const snapshot = await db.collection("waterLevel")
                  .where(admin.firestore.FieldPath.documentId(), "==", id)
                  .get()
                  .then(
                    (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({ id:doc.id,...doc.data() }));
                    res.status(200).json(data); 
                    console.log(data); }                          
                  )
                  .catch( 
                    error => {
                    res.status(500).json({error:error})                   
                  });
});
//post about
app.post("/waterLevel",async (req,res,next) =>{
  const data = req.body;
    let snapshot= await db.collection("waterLevel")
        .add(data)
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

app.put("/waterLevel",async (req,res,next)=>{
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    let snapshot= await db.collection("waterLevel")
        .doc(id)
        .update({
        data
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
app.delete("/waterLevel",async (req,res,next) =>{
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  let snapshot= await db.collection("waterLevel")
      .doc(id)
      .delete({
      data
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

module.exports = app;