const { registerUser, loginUser, getUserById } = require("../services/auth.service");

const registerController = async (req, res) => {
    try {
        console.log("Données reçues pour l'inscription :", req.body);
        const { name, email, password } = req.body;
        const newUser = await registerUser({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        console.log("Données reçues pour la connexion :", req.body);
        const result = await loginUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const profileController = async (req, res) => {
    res.json({ id: req.user.id, name: req.user.name,
        email: req.user.email, message: "Welcome !" });
};

module.exports = { loginController, registerController, profileController };
