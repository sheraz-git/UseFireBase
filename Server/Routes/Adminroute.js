const express=require("express");
const user=require("../Controller/User");
const info=require("../Controller/Addinformation");
const middleware=require("../Middleware/tokenVerification");
const router = express.Router();


///////////////Usersignup and login////////
///// user Signup /////
router.post('/signup',user.create);
router.get('/getsignup',user.getUsers);

///// user login /////
router.post('/checkuser',user.loginuser);
router.get('/getloginuser/:email',middleware.verifyToken,user.getloginuser);

///// Product added /////
router.post('/productcreate',middleware.verifyToken,info.Productcreate);
router.get('/getProducts',middleware.verifyToken,info.getProducts);

module.exports = router;
