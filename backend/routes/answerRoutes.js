const express = require('express');
const authController = require('./../controllers/authController');
const answerController = require('./../controllers/answerController');
const userController = require('./../controllers/userController');
const testingController = require('./../controllers/testingController');


const router = express.Router();

router.get(
  '/uncheck',
  answerController.uncheck
)

// ALL ROUTES BELOW WILL REQUIRE THE USER TO BE LOGGED IN
router.use(testingController.protect);


router.post(
  '/checkAnswers',
  userController.getMe,
  answerController.checkAnswers
);

router.get(
  '/check',
  answerController.check
)

module.exports = router;
