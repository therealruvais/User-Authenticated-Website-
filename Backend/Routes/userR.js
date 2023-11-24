const express = require('express');
const { SignUp, Login, userVerification, getUser, refreshToken } = require('../controller/userC');
const router = express.Router()




router.post('/register', SignUp)
router.post('/login', Login)
router.get("/verify", userVerification, getUser);
router.get('/refresh' , refreshToken , userVerification , getUser)
 



module.exports  = router