const express = require('express');
const cors = require('cors');
const user = require('./congfig');
const app = express();
app.use(express.json());
app.use(cors());
app.post("/update", async (req, res) => {
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    await user.doc(id).update(data);
    res.send({ msg: "Updated" });
  });
  app.post("/delete", async (req, res) => {
    const id = req.body.id;
    await user.doc(id).delete();
    res.send({ msg: "Deleted" });
  });
app.get('/get',async (req,res)=>{
    const snapshot = await user.get();
    const id = snapshot.docs.map((doc)=>doc.id);
    const list = snapshot.docs.map((doc) => ({ id:doc.id,...doc.data() }));
    
    console.log(list);
    res.send(list);
});
app.post('/create',async (req,res)=>{
    const data = req.body;
    console.log("Data from users",data);
    await user.add(data);
    res.send({msg:"User data"});
} );
app.listen(4000, ()=> console.log("Up and running at port 4000"));