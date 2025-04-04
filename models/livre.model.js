const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    description: { type: String, required: true },
    anneePublication: { type: Number, required: true },
    imagelivre: {type: String},
    downloadlivre: {type: String},
    dateAjout: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Livre', livreSchema);
