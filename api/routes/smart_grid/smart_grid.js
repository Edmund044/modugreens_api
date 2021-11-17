const express = require('express');
const app = express();

require('dotenv').config();
const admin = require('../../../firebase/database');
const db = admin.firestore();


//get about 
app.get("/smart",async (req,res,next)=>{
  const snapshot = await db.collection("smart")
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
app.get("/instruction",async (req,res,next)=>{
    const snapshot = await db.collection("instruction")
                    //.orderBy('timestamp', 'desc').limit(1)
                    .limit(1)
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
  //post smart
app.post("/instruction",async (req,res,next) =>{
    const data = req.body;
      let snapshot= await db.collection("instruction")
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
//get smart
app.get("/smart",async (req,res,next)=>{
  const snapshot = await db.collection("smart")
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
app.get("/smart/:id",async (req,res,next)=>{
  const id = req.params.id;
  console.log(id);
  const snapshot = await db.collection("smart")
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
//get smart
app.get("/smart/:id",async (req,res,next)=>{
  const id = req.params.id;
  console.log(id);
  const snapshot = await db.collection("smart")
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

//post smart
app.post("/smart",async (req,res,next) =>{
  const data = req.body;
    let snapshot= await db.collection("smart")
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

app.put("/smart",async (req,res,next)=>{
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    let snapshot= await db.collection("smart")
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
app.delete("/smart",async (req,res,next) =>{
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  let snapshot= await db.collection("smart")
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