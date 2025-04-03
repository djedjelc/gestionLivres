const Livre = require('../models/livre.model');

exports.ajouterLivre = async (data) => {
    const livre = new Livre(data);
    return await livre.save();
};

exports.listerLivres = async () => {
    return await Livre.find();
};

exports.trouverLivre = async (id) => {
    return await Livre.findById(id);
};

exports.modifierLivre = async (id, data) => {
    return await Livre.findByIdAndUpdate(id, data, { new: true });
};

exports.supprimerLivre = async (id) => {
    return await Livre.findByIdAndDelete(id);
};
