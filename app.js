require("dotenv").config({path: './.env'})
const express = require('express');
const app = express();

//database
require("./Models/database").connectDatabase();

//logger
const logger = require('morgan');
app.use(logger("tiny"));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/", require('./routes/indexRoutes'));

//Error handler
const ErrorHandler = require("./utils/errorHandler");
const {generatedErrors} = require("./Middlewares/error")
app.all("*", (req,res,next)=>{
    next(new ErrorHandler(`Requested url not found ${req.url}`, 404))
})
app.use(generatedErrors);
    

app.listen(process.env.PORT, console.log(`server is running on port ${process.env.PORT}`))