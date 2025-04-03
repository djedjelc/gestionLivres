const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/auth.service");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès refusé. Token manquant ou mal formé" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        req.user = user;
        next();
    } catch (error) {
        const message = error.name === "TokenExpiredError" ? "Token expiré" : "Token invalide." 
        res.status(401).json({ message: message});
    }
};

module.exports = authMiddleware;
