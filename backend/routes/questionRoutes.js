const express = require('express');
const userController = require('./../controllers/userController');
const testingController = require('./../controllers/testingController');
const questionController = require('./../controllers/questionController');
const authController = require('./../controllers/authController');


const router = express.Router();

// USER MUST BE LOGGED IN TO ACCESS THE FOLLOWING ROUTES
router.use(testingController.protect);

router.get(
  '/getQuestions',
  userController.getMe,
  questionController.getQuestions
);

// USER MUST BE A ADMIN TO ACCESS THE FOLLOWING ROUTES
// router.use(authController.adminOnly);
router.use(testingController.adminOnly);


router.post('/createQuestion', questionController.createQuestion);
router.get('/getAllQuestions', questionController.getAllQuestions);

module.exports = router;