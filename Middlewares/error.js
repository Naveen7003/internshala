exports.generatedErrors = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500 ;
    
    if(err.name === "MongooseServerError" && err.message.includes("E11000 duplicate key")){
        err.message= "User with this email already exists";
    }

    res.status(statusCode).json({
        message: err.message,
        errName: err.name
    })
}