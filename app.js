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

//session and cookie
const session= require('express-session');
const cookieparser = require('cookie-parser');
app.use(session({
    resave:true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieparser());

//file upload
const fileupload = require('express-fileupload');
app.use(fileupload());

app.use("/user", require('./routes/indexRoutes'));

app.use("/resume", require('./routes/resumeRoutes'));

app.use("/employe", require('./routes/employeRoutes'));

//Error handler
const ErrorHandler = require("./utils/errorHandler");
const {generatedErrors} = require("./Middlewares/error")
app.all("*", (req,res,next)=>{
    next(new ErrorHandler(`Requested url not found ${req.url}`, 404))
})
app.use(generatedErrors);
    

app.listen(process.env.PORT, console.log(`server is running on port ${process.env.PORT}`))