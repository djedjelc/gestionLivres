const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livre.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/', authMiddleware, livreController.ajouterLivre);
router.get('/', authMiddleware, livreController.listerLivres);
router.get('/:id', authMiddleware, livreController.trouverLivre);
router.put('/:id', authMiddleware, livreController.modifierLivre);
router.delete('/:id', authMiddleware, livreController.supprimerLivre);

module.exports = router;
