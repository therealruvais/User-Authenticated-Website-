const express = require('express');
const { SignUp, Login, userVerification, getUser, refreshToken, logOut } = require('../controller/userC');
const router = express.Router()




router.post('/register', SignUp)
router.post('/login', Login)
router.get("/verify", userVerification, getUser);
router.post('/logout', userVerification , logOut)
router.get('/refresh' , refreshToken , userVerification , getUser)



module.exports  = router