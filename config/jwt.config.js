require("dotenv").config();

module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: "1h",
    refreshTokenExpiresIn: "7d"
};
