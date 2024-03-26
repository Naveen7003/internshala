const { catchAsyncErrors } = require("../Middlewares/catchAsyncError");
const Student = require('../Models/studentModel')

exports.homepage = catchAsyncErrors( async (req, res, next)=>{    
        res.json({message: "homepage"})   
});

exports.studentsignup = catchAsyncErrors( async (req, res, next)=>{    
        const student = await new Student(req.body).save()
        res.status(201).json(student)
});