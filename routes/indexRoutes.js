const express = require('express');
const router = express.Router();
const { homepage, studentsignup , studentsignin, studentsignout, currentUser, studentsendmail, studentforgetlink, studentresetpassword, studentupdate, studentavatar } = require('../controllers/indexController');
const { isAuthenticated } = require('../Middlewares/auth');

//get
router.get('/',  homepage)

//get/student
router.post('/student', isAuthenticated, currentUser)

//POST/student/signup
router.post('/student/signup', studentsignup)

//POST/student/signin
router.post('/student/signin', studentsignin)

//post/student/signupx`
router.post('/student/signout',isAuthenticated, studentsignout)

//Post/student/signupx`
router.post('/student/send-mail', studentsendmail)

//get/student/forgetlink/student.studentid`
router.get('/student/forget-link/:id', studentforgetlink)


//post/student/reset-password/:studentid`
router.post('/student/reset-password/:id',isAuthenticated, studentresetpassword)

//post/student/update/:id`
router.post('/student/update/:id',isAuthenticated, studentupdate)

//post/student/update/:studentid`
router.post('/student/avatar/:id',isAuthenticated, studentavatar)



module.exports = router;