const { catchAsyncErrors } = require("../Middlewares/catchAsyncError");
const Student = require('../Models/studentModel')
const {sendtoken} = require("../utils/sendToken");

exports.homepage = catchAsyncErrors( async (req, res, next)=>{    
        res.json({message: "homepage"})   
});

exports.currentUser = catchAsyncErrors(async(req, res, next)=>{
        const student = await Student.findById(req.id).exec();
        res.json({student})
})

exports.studentsignup = catchAsyncErrors( async (req, res, next)=>{    
        const student = await new Student(req.body).save()
        sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors( async (req, res, next)=>{    
        const student = await Student.findOne({email: req.body.email}).select("+password").exec()

        if(!student) return next(new ErrorHandler("User not found with this email address", 404))

        const isMatch = student.comparepassword(req.body.password);
        if(!isMatch) return ErrorHandler("Wrong Credentials", 500)
        sendtoken(student, 201, res);
});

exports.studentsignout = catchAsyncErrors( async (req, res, next)=>{    
        res.clearCookie("token");
        res.json({message:"Successfully SignedOut!"})
});