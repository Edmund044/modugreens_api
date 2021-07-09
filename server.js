const http = require('http');
const app = require('./api/app');
//const express = require('express');
//const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port,()=>{
    console.log("Server running at port 3000");
});
