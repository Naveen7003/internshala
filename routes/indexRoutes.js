const express = require('express');
const router = express.Router();
const { homepage, studentsignup , studentsignin, studentsignout, currentUser } = require('../controllers/indexController');
const { isAuthenticated } = require('../Middlewares/auth');

//get
router.get('/',  homepage)

//get/student
router.post('/student', isAuthenticated, currentUser)

//POST/student/signup
router.post('/student/signup', studentsignup)

//POST/student/signin
router.post('/student/signin', studentsignin)

//POST/student/signupx`
router.get('/student/signout',isAuthenticated, studentsignout)



module.exports = router;