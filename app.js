const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/assignment15DB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/users", userRoutes);

app.use("/students", studentRoutes);

app.listen(5000, ()=>{

    console.log("Server Running on Port 5000");

});