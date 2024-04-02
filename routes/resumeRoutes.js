const express = require('express');
const router = express.Router();
const { resume , addEducation, editEducation, deleteEducation, addJob, editJob, deleteJob, addCourses, editCourses, deleteCourses ,
    addAccomplishment, editAccomplishment , deleteAccomplishment ,addInternships, editInternships,deleteInternships,
    addProjects, editProjects, deleteProjects, addSkills, editSkills, deleteSkills  } = require('../controllers/resumeController');
const { isAuthenticated } = require('../Middlewares/auth');

//get
router.get('/',isAuthenticated, resume);

//post
router.post('/add-edu',isAuthenticated, addEducation);

//post
router.post('/edit-edu/:jobid',isAuthenticated, editEducation);

//post
router.post('/delete-edu/:jobid',isAuthenticated, deleteEducation);

//post
router.post('/add-job',isAuthenticated, addJob);

//post
router.post('/edit-job/:jobid',isAuthenticated, editJob);

//post
router.post('/delete-job/:jobid',isAuthenticated, deleteJob);

//post
router.post('/add-courses',isAuthenticated, addCourses);

//post
router.post('/edit-courses/:courseid',isAuthenticated, editCourses);

//post
router.post('/delete-courses/:courseid',isAuthenticated, deleteCourses);

//post
router.post('/add-Accomplishment',isAuthenticated, addAccomplishment);

//post
router.post('/edit-Accomplishment/:accid',isAuthenticated, editAccomplishment);

//post
router.post('/delete-Accomplishment/:accid',isAuthenticated, deleteAccomplishment);

//post
router.post('/add-Internships',isAuthenticated, addInternships);

//post
router.post('/edit-Internships/:intid',isAuthenticated, editInternships);

//post
router.post('/delete-Internships/:intid',isAuthenticated, deleteInternships);

//post
router.post('/add-Projects',isAuthenticated, addProjects);

//post
router.post('/edit-Projects/:proid',isAuthenticated, editProjects);

//post
router.post('/delete-Projects/:proid',isAuthenticated, deleteProjects);

//post
router.post('/add-Skills',isAuthenticated, addSkills);

//post
router.post('/edit-Skills/:skiid',isAuthenticated, editSkills);

//post
router.post('/delete-Skills/:skiid',isAuthenticated, deleteSkills);


module.exports = router;