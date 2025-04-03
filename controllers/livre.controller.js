const livreService = require('../services/livre.service');

exports.ajouterLivre = async (req, res) => {
    try {
        const livre = await livreService.ajouterLivre(req.body);
        res.status(201).json(livre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listerLivres = async (req, res) => {
    try {
        const livres = await livreService.listerLivres();
        res.status(200).json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.trouverLivre = async (req, res) => {
    try {
        const livre = await livreService.trouverLivre(req.params.id);
        if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
        res.status(200).json(livre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.modifierLivre = async (req, res) => {
    try {
        const livre = await livreService.modifierLivre(req.params.id, req.body);
        if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
        res.status(200).json(livre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.supprimerLivre = async (req, res) => {
    try {
        const livre = await livreService.supprimerLivre(req.params.id);
        if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
        res.status(200).json({ message: "Livre supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
