const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Cet email est déjà utilisé.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    return { token: generateToken(newUser) };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Utilisateur non trouvé.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Mot de passe incorrect.");

    return { token: generateToken(user) };
};

async function getUserById(userId) {
    try {
        return await User.findById(userId).select("-password"); // Exclut le mot de passe des données retournées
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        return null;
    }
}

module.exports = { registerUser, loginUser, getUserById };
