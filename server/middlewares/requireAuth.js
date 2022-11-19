const jwt = require("jsonwebtoken");

const config = process.env;

const requireAuth = (req, res, next) => {
    let token =
        req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(401).send("Unauthorized. A token is required for authentication");
    }
    try {
        // token = token.replace(/^Bearer\s+/, "");
        token = token.split(" ")[1];

        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};

module.exports = requireAuth;
