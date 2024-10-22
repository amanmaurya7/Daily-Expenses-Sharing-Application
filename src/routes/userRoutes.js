const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { auth, validate } = require('../middleware/auth');
const userController = require('../controllers/userController');

router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().notEmpty(),
    body('mobileNumber').isMobilePhone(),
    body('password').isLength({ min: 6 }),
    validate
  ],
  userController.register
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    validate
  ],
  userController.login
);

router.get('/me', auth, userController.getUserProfile);