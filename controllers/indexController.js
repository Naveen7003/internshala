const { catchAsyncErrors } = require("../Middlewares/catchAsyncError");
const Student = require('../Models/studentModel');
const Internship = require('../Models/internshipModel');
const Job = require('../Models/jobModel');
const ErrorHandler = require("../utils/errorHandler");
const {sendtoken} = require("../utils/sendToken");
const {sendmail} = require("../utils/nodemailer");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require('path');

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

exports.studentsendmail = catchAsyncErrors( async (req, res, next)=>{  
        const student = await Student.findOne({email: req.body.email})
        if(!student)
        return next(new ErrorHandler("User not found with this email address", 404))

        const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
        sendmail(req, res, next, url)

        if(student.resetPasswordToken = "1"){
                student.resetPasswordToken = "0",
                student.password = req.body.password;
                await student.save()
        }else{
                return next(new ErrorHandler("Invalid Reset Password Link!", 500))
        }
        

        res.json({student,url})
});

exports.studentforgetlink = catchAsyncErrors( async (req, res, next)=>{    
        const student = await Student.findById(req.params.id).exec();

        if(!student)
        return next(new ErrorHandler("User not found with this email address", 404))

        student.password = req.body.password;
        await student.save();

        res.status(200).json({
                message: "password has successfully changed"
        })
});

exports.studentresetpassword = catchAsyncErrors( async (req, res, next)=>{    
        const student = await Student.findById(req.id).exec();

        student.password = req.body.password;
        await student.save();

        res.status(200).json({
                message: "password has successfully changed"
        })
});

exports.studentupdate = catchAsyncErrors( async (req, res, next)=>{    
        const student = await Student.findByIdAndUpdate(req.params.id,req.body).exec();

        res.status(200).json({
                success:true,
                message: "Student Updated Successfully",
        })
});

exports.studentavatar = catchAsyncErrors( async (req, res, next)=>{
        const student = await Student.findById(req.params.id).exec()
        const file = req.files.avatar;
        const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
                file.name
                )}`;

        if(student.avatar.fileId !== ""){
                await imageKit.deleteFile(student.avatar.fileId);
        }

        const {fileId,url} = await imageKit.upload({
                file:file.data,
                fileName: modifiedFileName,
        })
        student.avatar = {fileId,url}
        await student.save();
        res.status(200).json({
                success:true,
                message: "profile updated!"
        })
});

//------------apply internships--------------
exports.applyinternship = catchAsyncErrors(async(req, res, next)=>{
        const student = await Student.findById(req.id).exec();
        const internship = await Internship.findById(req.params.internshipid).exec();
        student.internships.push(internship._id)
        internship.student.push(student._id)
        await student.save()
        await internship.save()
        res.json({student,internship})
})


//------------apply jobs--------------
exports.applyjob = catchAsyncErrors(async(req, res, next)=>{
        const student = await Student.findById(req.id).exec();
        const job = await Job.findById(req.params.jobid).exec();
        student.jobs.push(job._id)
        job.student.push(student._id)
        await student.save()
        await job.save()
        res.json({student,job})
})
