const { catchAsyncErrors } = require("../Middlewares/catchAsyncError");
const Student = require('../Models/studentModel');
const ErrorHandler = require("../utils/errorHandler");
const {sendtoken} = require("../utils/sendToken");
const {sendmail} = require("../utils/nodemailer");
const {v4:uuidv4} = require('uuid');
const imageKit = require("../utils/imageKit").initImageKit();
const path = require('path');


exports.resume = catchAsyncErrors( async (req, res, next)=>{
    const {resume} = await Student.findById(req.id).exec();   
        res.json({resume}) ;  
 }); 

 exports.addEducation = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    student.resume.education.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"Education Added"})
 }); 

 exports.editEducation = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    },
    await student.save();
    res.json({message:"Education updded"})
 }); 

 exports.deleteEducation = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({message:"Education deleted"})
 }); 

 exports.addJob = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    student.resume.jobs.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"Job Added"})
 }); 

 exports.editJob = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const jobIndex = student.resume.jobs.findIndex(
        (i) => i.id === req.params.jobid
    );
    student.resume.jobs[jobIndex] = {
        ...student.resume.jobs[jobIndex],
        ...req.body,
    },
    await student.save();
    res.json({message:"job updded"})
 }); 

 exports.deleteJob = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const filteredjob = student.resume.jobs.filter(
        (i) => i.id !== req.params.jobid
    );
    student.resume.jobs = filteredjob;
    await student.save();
    res.json({message:"Education deleted"})
 }); 

 exports.addCourses = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    student.resume.courses.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"Course Added"})
 }); 

 exports.editCourses = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const courseIndex = student.resume.courses.findIndex(
        (i) => i.id === req.params.courseid
    );
    student.resume.courses[courseIndex] = {
        ...student.resume.courses[courseIndex],
        ...req.body,
    },
    await student.save();
    res.json({message:"Course updded"})
 }); 

 exports.deleteCourses = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const filteredcourse = student.resume.courses.filter(
        (i) => i.id !== req.params.courseid
    );
    student.resume.courses = filteredcourse;
    await student.save();
    res.json({message:"Courses deleted"})
 }); 

 exports.addAccomplishment = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    student.resume.accomplishments.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"accomplishments Added"})
 }); 

 exports.editAccomplishment = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const accomplishmentsIndex = student.resume.accomplishments.findIndex(
        (i) => i.id === req.params.accid
    );
    student.resume.accomplishments[accomplishmentsIndex] = {
        ...student.resume.accomplishments[accomplishmentsIndex],
        ...req.body,
    },
    await student.save();
    res.json({message:"accomplishments updded"})
 }); 

 exports.deleteAccomplishment = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const filteredaccomplishments = student.resume.accomplishments.filter(
        (i) => i.id !== req.params.accid
    );
    student.resume.accomplishments = filteredaccomplishments;
    await student.save();
    res.json({message:"accomplishments deleted"})
 }); 

 exports.addInternships = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    student.resume.internships.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"internships Added"})
 }); 

 exports.editInternships = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const internshipsIndex = student.resume.internships.findIndex(
        (i) => i.id === req.params.intid
    );
    student.resume.internships[internshipsIndex] = {
        ...student.resume.internships[internshipsIndex],
        ...req.body,
    },
    await student.save();
    res.json({message:"internships updded"})
 }); 

 exports.deleteInternships = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const filteredinternships = student.resume.internships.filter(
        (i) => i.id !== req.params.intid
    );
    student.resume.internships = filteredinternships;
    await student.save();
    res.json({message:"internships deleted"})
 }); 

 exports.addProjects = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    student.resume.projects.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"projects Added"})
 }); 

 exports.editProjects = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const projectsIndex = student.resume.projects.findIndex(
        (i) => i.id === req.params.proid
    );
    student.resume.projects[projectsIndex] = {
        ...student.resume.projects[projectsIndex],
        ...req.body,
    },
    await student.save();
    res.json({message:"projects updded"})
 }); 

 exports.deleteProjects = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const filteredprojects = student.resume.projects.filter(
        (i) => i.id !== req.params.proid
    );
    student.resume.projects = filteredprojects;
    await student.save();
    res.json({message:"projects deleted"})
 }); 

 exports.addSkills = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    student.resume.skills.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"skills Added"})
 }); 

 exports.editSkills = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const skillsIndex = student.resume.skills.findIndex(
        (i) => i.id === req.params.skiid
    );
    student.resume.skills[skillsIndex] = {
        ...student.resume.skills[skillsIndex],
        ...req.body,
    },
    await student.save();
    res.json({message:"skills updded"})
 }); 

 exports.deleteSkills = catchAsyncErrors( async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();  
    const filteredskills = student.resume.skills.filter(
        (i) => i.id !== req.params.skiid
    );
    student.resume.skills = filteredskills;
    await student.save();
    res.json({message:"skills deleted"})
 }); 


