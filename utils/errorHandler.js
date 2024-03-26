//error ka message generate karne ke liye
class ErrorHandler extends Error {
    constructor(message , statusCode){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler;