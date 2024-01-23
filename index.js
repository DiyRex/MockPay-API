const express =require('express');
//const dbConn = require('./dbConn.js');

const app = express();
const port = 8081;

//dbConn();

app.use(express.json());

// Default Route
app.get("/",(req,res)=>{
    res.status(200).json({
        message: "MockPay is Running!",
    })
});

// Adding Route Modules

// Unknown Routes
app.get("*",(req,res)=>{
    res.status(404).json({
        message: "This Route doesn't exist",
    });
});

app.listen(port, ()=>{
    console.log(`Server started at http://127.0.0.1:${port}`)
})