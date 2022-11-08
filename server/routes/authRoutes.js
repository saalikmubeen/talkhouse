const express = require("express");
const router = express.Router();


const {login, register} = require("../controllers/auth.controller");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const requireAuth = require("../middlewares/requireAuth");

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

router.post(
    "/register",
    validator.body(registerSchema),
    register
);


router.post(
    "/login",
    validator.body(loginSchema),
    login
);

router.get(
    "/me",
    requireAuth,
    (req, res) => {
        res.status(200).json({
            me: {
                _id: req.user.userId,
                email: req.user.email,
                username: req.user.username
            },
        });
    }
);

// test route for requireAuth middleware
router.get("/test", requireAuth, (req, res) => {
    res.send(`Hello, ${req.user.email}`);
});

module.exports = router;
