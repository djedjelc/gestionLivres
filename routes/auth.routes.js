const express = require("express");
const router = express.Router();
//const { loginController, registerController, profileController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authController = require('../controllers/auth.controller');
const validator = require('../middlewares/validator.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

router.post('/register', 
    validator(registerSchema), 
    authController.registerController
);

router.post('/login', 
    validator(loginSchema), 
    authController.loginController
);

//router.post("/register", registerController);
//router.post("/login", loginController);
router.get("/profile", authMiddleware, authController.profileController);

module.exports = router;
