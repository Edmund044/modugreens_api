const express = require('express');
const app = express();

require('dotenv').config();
const admin = require('../../../firebase/database');
const db = admin.firestore();


//get about 
app.get("/matatu",async (req,res,next)=>{
  const snapshot = await db.collection("matatu")
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
//get vehicle
app.get("/vehicle",async (req,res,next)=>{
  const snapshot = await db.collection("vehicle")
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
app.get("/matatu/:id",async (req,res,next)=>{
  const id = req.params.id;
  console.log(id);
  const snapshot = await db.collection("matatu")
                 // .where(admin.firestore.FieldPath.documentId(), "==", id)
                 .where("data.car_id", "==",id) 
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
//get vehicle
app.get("/vehicle/:id",async (req,res,next)=>{
  const id = req.params.id;
  console.log(id);
  const snapshot = await db.collection("vehicle")
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
app.post("/matatu",async (req,res,next) =>{
  const data = req.body;
    let snapshot= await db.collection("matatu")
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
//post matatu gsm
app.post("/matatu/:field1/:field2",async (req,res,next) =>{
  const data = {
   "data":{
     "field1":req.params.field1,
     "field2":req.params.field2
    }
  };
  req.body;
    let snapshot= await db.collection("matatu")
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
//post vehicle
app.post("/vehicle",async (req,res,next) =>{
  const data = req.body;
    let snapshot= await db.collection("vehicle")
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

app.put("/matatu",async (req,res,next)=>{
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    let snapshot= await db.collection("matatu")
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
app.delete("/matatu",async (req,res,next) =>{
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  let snapshot= await db.collection("matatu")
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