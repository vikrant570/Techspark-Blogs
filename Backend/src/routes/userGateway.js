const express = require('express');
const router = express.Router();
const otpVerification = require('../services/newUserAuth');

//CONTROLLERS....
const LGU = require('../Controllers/Users/userGatewayController');

//MIDDLWARES....
const isLoggedIn = require('../Middlewares/loggedInCheckMiddleware');


//SUBROUTES...
router.post("/login", LGU.loginUser)
router.post('/register', LGU.registerRequest); 
router.post('/register/verify', otpVerification);
router.post('/register/submission', LGU.registerUser)
router.patch('/update', isLoggedIn, LGU.updateUser);
router.delete('/delete', isLoggedIn, LGU.deleteUser);
router.get('/myProfile', isLoggedIn, LGU.getMyInfo);


module.exports = router;