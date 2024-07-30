const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const jwtSecret =
  'aa672bc69e6332d2e519ef196042771c182b505f54569393eba4df8b2a9af787a4c9b89b393db90a94382388f6655e79';

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };
//   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//   res.cookie('testing', token, cookieOptions);

//   res.status(statusCode).json({
//     status: 'success',
//     token,
//     data: {
//       user,
//     },
//   });
// };

exports.verifyToken = (req, res, next) => {
  console.log('Verifying token');
  const token =
    req.query.token ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      req.user.token = token;
      console.log('verifing done');
      next();
    } catch (err) {
      res.status(400).send('Invalid token');
    }
  } else {
    res.status(400).send('Token is required');
  }
};

exports.signup = async (req, res) => {
  const { name, email, phone, branch, token } = req.user;
  const userData = {
    name: name,
    email: email,
    phoneNumber: phone,
    branch: branch,
  };
  // console.log(userData);
  console.log('Signing up');
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  try {
    // Check if user with email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log('done Signup');
      if (
        existingUser.nonTechLinks === '' ||
        existingUser.links === '' ||
        existingUser.techStack === ''
      ) {
        // res.cookie('jwt', token, cookieOptions);
        console.log('@@@@@@@@@@@@@@@@@@@@');

        res.json({
          result: false,
          token: token,
          user: {
            name: existingUser.name,
            email: existingUser.email,
            answers: existingUser.answers,
            shift: existingUser.shift,
            token: existingUser._id,
          },
        });
        console.log('######################');
      } else {
        const user = {
          token: existingUser._id,
          name: name,
          email: email,
          phoneNumber: phone,
          branch: branch,
          applicationNumber: 123456789,
          password: 1234,
          shift: existingUser.shift,
          links: existingUser.links,
          nonTechFields: existingUser.nonTechFields,
          nonTechLinks: existingUser.nonTechLinks,
          techStack: existingUser.techStack,
          isAdmin: existingUser.isAdmin,
        };
        // res.cookie('jwt', token, cookieOptions);
        console.log('@@@@@@@@@@@@@@@@@@@@');

        res.json({
          status: 'success',
          result: true,
          token,
          user,
        });
        console.log('######################');
      }
    } else {
      // Create a new user instance
      const newUser = new User(userData);
      // Save the user to the database
      const savedUser = await newUser.save();
      // Create and send the token
      console.log('done signup');
      // res.cookie('jwt', token, cookieOptions);
      console.log('@@@@@@@@@@@@@@@@@@@@');
      res.json({
        result: false,
        token: token,
        user: {
          token: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          answers: savedUser.answers,
          shift: savedUser.shift,
        },
      });
      console.log('######################');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Controller method to handle the POST request
exports.postDetails = async (req, res) => {
  console.log('Posting details');

  const data = req.body; // Get JSON data from the request body

  try {
    if (!data) {
      return res
        .status(400)
        .json({ error: 'Invalid data format. Email is required.' });
    }
    if (!data.token) {
      return res.status(400).json({ error: 'Token is required.' });
    }
    const decoded = jwt.verify(data.token, jwtSecret);
    const { techStack, links, nonTechFields, nonTechLinks, shift } = data;

    // Find the user by email
    const user = await User.findOne({ email: decoded.email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update user fields
    user.techStack = techStack;
    user.links = links;
    user.nonTechFields = nonTechFields;
    user.nonTechLinks = nonTechLinks;
    user.shift = 1;

    // Save the updated user
    await user.save();

    const userData = {
      token: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      branch: user.branch,
      applicationNumber: 123456789,
      password: 1234,
      shift: user.shift,
      links: user.links,
      nonTechFields: user.nonTechFields,
      nonTechLinks: user.nonTechLinks,
      techStack: user.techStack,
      isAdmin: user.isAdmin,
    };
    res.cookie('jwt', token, cookieOptions);
    console.log('@@@@@@@@@@@@@@@@@@@@');
    res.status(200).json({
      message: 'Data received and updated successfully',
      status: 'success',
      result: true,
      user: userData,
      token: data.token,
    });
    console.log('######################');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    // Debugging: Log the token

    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 2) Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // 3) Check if user still exists
    const currentUser = await User.findOne({ email: decoded.email });
    if (!currentUser) {
      return res.status(401).json({
        status: 'failed',
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    console.error('Error in protect middleware:', err);
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid token or authentication failed.',
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = req.body;
    console.log('Logging in');

    // 1) Check if email and password exist
    if (!token) {
      res.status(400).json({
        status: 'failed',
        message: 'Please provide token',
      });
      return;
    }
    const decoded = jwt.verify(token, jwtSecret);

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      res.status(401).json({
        status: 'failed',
        message: 'Incorrect User',
      });
      return;
    }

    if (user.cheatAttempts >= 3) {
      res.status(401).json({
        status: 'failed',
        message:
          'You have been disqualified as you have been caught cheating three times.',
      });
      return;
    }

    // 3) If everything ok, send token to client
    // createSendToken(user, 200, res);
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      error: err.message,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.adminOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    // const user = await User.findById(req.user.email);
    if (user.isAdmin === true) {
      return next();
    } else {
      res.status(401).json({
        status: 'failed',
        message: 'You are not an admin',
      });
    }
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      message: 'You are not an admin',
      error: err.message,
    });
  }
};
