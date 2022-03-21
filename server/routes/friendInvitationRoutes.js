const express = require("express");
const router = express.Router();

const { inviteFriend } = require("../controllers/friendInvitation.controller");

const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const requireAuth = require("../middlewares/requireAuth");

const invitationSchema = Joi.object({
    email: Joi.string().email().required(),
});


// invite a friend
router.post("/invite", requireAuth, validator.body(invitationSchema), inviteFriend);

module.exports = router;
