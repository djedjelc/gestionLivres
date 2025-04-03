const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livre.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const validator = require('../middlewares/validator.middleware');
const livreSchema = require('../validators/livre.validator');

router.post('/', authMiddleware, validator(livreSchema), livreController.ajouterLivre);
router.get('/', authMiddleware, livreController.listerLivres);
router.get('/:id', authMiddleware, livreController.trouverLivre);
router.put('/:id', authMiddleware, validator(livreSchema), livreController.modifierLivre);
router.delete('/:id', authMiddleware, livreController.supprimerLivre);

module.exports = router;
