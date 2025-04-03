const express = require("express");
const router = express.Router();
const { loginController, registerController, profileController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, profileController);

module.exports = router;
