const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const testingController = require('./../controllers/testingController');


const router = express.Router();

router.post('/signup', testingController.signup);
router.post('/login', testingController.login);
router.get('/logout', testingController.logout);
router.get('/testing', testingController.verifyToken, testingController.signup);
// router.get('/verifyd', testingController.verifyToken);
router.post('/postdetails', testingController.postDetails);



// router.patch('/changeShift', userController.changeShift);

// USER MUST BE LOGGED IN TO ACCESS THE FOLLOWING ROUTES
router.use(testingController.protect);

router.get('/profile', userController.getMe, userController.getUserProfile);
router.get('/getPoints', userController.getMe, userController.getPoints);
router.patch(
  '/cheatAttempt',
  userController.getMe,
  userController.cheatAttempt
);

// USER MUST BE A ADMIN TO ACCESS THE FOLLOWING ROUTES
// router.use(authController.adminOnly);
router.use(testingController.adminOnly);


router.get('/leaderboard', userController.leaderboard);

module.exports = router;