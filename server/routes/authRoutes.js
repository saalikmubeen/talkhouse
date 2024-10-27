const express = require('express');
const router = express.Router();

const {
  login,
  register,
  subscribe,
  unsubscribe,
} = require('../controllers/auth.controller');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator(
  {}
);
const requireAuth = require('../middlewares/requireAuth');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const subscriptionSchema = Joi.object({
  endpoint: Joi.string().required(),
  keys: Joi.object({
    auth: Joi.string().required(),
    p256dh: Joi.string().required(),
  }).required(),
});

router.post('/register', validator.body(registerSchema), register);

router.post('/login', validator.body(loginSchema), login);

router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({
    me: {
      _id: req.user.userId,
      email: req.user.email,
      username: req.user.username,
    },
  });
});

// Save the user's push subscription
router.post(
  '/subscribe',
  requireAuth,
  // validator.body(subscriptionSchema),
  subscribe
);

// Unsubscribe the user from push notifications
router.post(
  '/unsubscribe',
  requireAuth,
  // validator.body(subscriptionSchema),
  unsubscribe
);

// test route for requireAuth middleware
router.get('/test', requireAuth, (req, res) => {
  res.send(`Hello, ${req.user.email}`);
});

module.exports = router;
