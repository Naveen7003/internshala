const express = require('express');
const router = express.Router();
const { homepage,currentemploye ,employeSignup , employesignin, employesignout,readinternship, readsingleinternship, employesendmail, employeforgetlink, employeresetpassword, employeupdate, employeavatar,createinternship, createjob, readjob, readsinglejob } = require('../controllers/employeController');
const { isAuthenticated } = require('../Middlewares/auth');

//get
router.get('/',  homepage)

//get/employe
router.post('/current', isAuthenticated, currentemploye)

//POST/employe/signup
router.post('/signup', employeSignup)

//POST/employe/signin
router.post('/signin', employesignin)

//post/employe/signupx`
router.post('/signout',isAuthenticated, employesignout)

//Post/employe/send-mail`
router.post('/send-mail', employesendmail)

//get/employe/forgetlink/employe.employeid`
router.get('/forget-link/:id', employeforgetlink)


//post/employe/reset-password/:employeid`
router.post('/reset-password/:id',isAuthenticated, employeresetpassword)

//post/employe/update/:id`
router.post('/update/:id',isAuthenticated, employeupdate)

//post/employe/update/avatar`
router.post('/avatar/:id',isAuthenticated, employeavatar)

//---------------Internship-----------
//post/employe/Internship/create
router.post('/internship/:id',isAuthenticated, createinternship)

//post/employe/Internship/read
router.post('/internship/read',isAuthenticated, readinternship)

//post/employe/Internship/read/:id
router.post('/internship/read/:id',isAuthenticated, readsingleinternship)

//---------------job-----------
//post/employe/job/create
router.post('/job/:id',isAuthenticated, createjob)

//post/employe/job/read
router.post('/job/read',isAuthenticated, readjob)

//post/employe/job/read/:id
router.post('/job/read/:id',isAuthenticated, readsinglejob)



module.exports = router;