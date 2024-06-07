const { catchAsyncErrors } = require("../Middlewares/catchAsyncError");
const Employe = require('../Models/employeModel');
const Internship = require("../Models/internshipModel")
const Job = require("../Models/jobModel")
const ErrorHandler = require("../utils/errorHandler");
const {sendtoken} = require("../utils/sendToken");
const {sendmail} = require("../utils/nodemailer");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require('path');

exports.homepage = catchAsyncErrors( async (req, res, next)=>{    
        res.json({message: "secure employe homepage"})   
});

exports.currentemploye = catchAsyncErrors(async(req, res, next)=>{
        const employe = await Employe.findById(req.id).exec();
        res.json({employe})
})

exports.employeSignup = catchAsyncErrors( async (req, res, next)=>{    
        const employe = await new Employe(req.body).save()
        sendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors( async (req, res, next)=>{    
        const employe = await Employe.findOne({email: req.body.email}).select("+password").exec()

        if(!employe) return next(new ErrorHandler("User not found with this email address", 404))

        const isMatch = employe.comparepassword(req.body.password);

        if(!isMatch) return ErrorHandler("Wrong Credentials", 500)

        sendtoken(employe, 201, res);
});

exports.employesignout = catchAsyncErrors( async (req, res, next)=>{    
        res.clearCookie("token");
        res.json({message:"Successfully SignedOut!"})
});

exports.employesendmail = catchAsyncErrors( async (req, res, next)=>{  
        const employe = await Employe.findOne({email: req.body.email})
        if(!employe)
        return next(new ErrorHandler("User not found with this email address", 404))

        const url = `${req.protocol}://${req.get("host")}/student/forget-link/${employe._id}`;
        sendmail(req, res, next, url)

        if(employe.resetPasswordToken = "1"){
                employe.resetPasswordToken = "0",
                employe.password = req.body.password;
                await employe.save();
        }else{
                return next(new ErrorHandler("Invalid Reset Password Link!", 500))
        }
        
        res.json({employe,url})
});

exports.employeforgetlink = catchAsyncErrors( async (req, res, next)=>{    
        const employe = await Employe.findById(req.params.id).exec();

        if(!employe)
        return next(new ErrorHandler("User not found with this email address", 404))

        employe.password = req.body.password;
        await employe.save();

        res.status(200).json({
                message: "password has successfully changed"
        })
});

exports.employeresetpassword = catchAsyncErrors( async (req, res, next)=>{    
        const employe = await Employe.findById(req.id).exec();

        employe.password = req.body.password;
        await employe.save();

        res.status(200).json({
                message: "password has successfully changed"
        })
});

exports.employeupdate = catchAsyncErrors( async (req, res, next)=>{    
        const employe = await Employe.findByIdAndUpdate(req.params.id,req.body).exec();

        res.status(200).json({
                success:true,
                message: "Student Updated Successfully",
        })
});

exports.employeavatar = catchAsyncErrors( async (req, res, next)=>{
        const employe = await Employe.findById(req.params.id).exec()
        const file = req.files.companylogo;
        const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
                file.name
                )}`;

        if(employe.companylogo.fileId !== ""){
                await imageKit.deleteFile(employe.companylogo.fileId);
        }

        const {fileId,url} = await imageKit.upload({
                file:file.data,
                fileName: modifiedFileName,
        })
        employe.companylogo = {fileId,url}
        await employe.save();
        res.status(200).json({
                success:true,
                message: "profile updated!"
        })
});

//_________________________________________Internship------------------
exports.createinternship = catchAsyncErrors( async (req, res, next)=>{  
        const employe = await Employe.findById(req.id).exec();
        const internship = await new Internship(req.body);
        internship.employe = employe._id;
        employe.internships.push(internship._id);
        await internship.save()
        await employe.save();
        res.status(201).json({success:true, internship})
});

exports.readinternship = catchAsyncErrors( async (req, res, next)=>{
        const {internships} = await Employe.findById(req.id).populate("internships").exec()       
        res.status(200).json({success:true, internships})
});

exports.readsingleinternship = catchAsyncErrors( async (req, res, next)=>{    
        const internship = await Internship.findById(req.params.id).exec()
        if(!internship) return new ErrorHandler("Internship not found")
        res.status(200).json({success:true, internship})
});

//_________________________________________Jobs------------------
exports.createjob = catchAsyncErrors( async (req, res, next)=>{  
        const employe = await Employe.findById(req.id).exec();
        const job = await new Job(req.body);
        job.employe = employe._id;
        employe.jobs.push(job._id);
        await job.save()
        await employe.save();
        res.status(201).json({success:true, job})
});

exports.readjob = catchAsyncErrors( async (req, res, next)=>{
        const {jobs} = await Employe.findById(req.id).populate("jobs").exec()       
        res.status(200).json({success:true, jobs})
});

exports.readsinglejob = catchAsyncErrors( async (req, res, next)=>{    
        const job = await job.findById(req.params.id).exec()
        if(!job) return new ErrorHandler("job not found")
        res.status(200).json({success:true, job})
});

