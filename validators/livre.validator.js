const Joi = require('joi');

const livreSchema = Joi.object({
    titre: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Le titre est requis',
            'string.min': 'Le titre doit contenir au moins 2 caractères',
            'string.max': 'Le titre ne peut pas dépasser 100 caractères'
        }),

    auteur: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'L\'auteur est requis',
            'string.min': 'Le nom de l\'auteur doit contenir au moins 2 caractères',
            'string.max': 'Le nom de l\'auteur ne peut pas dépasser 50 caractères'
        }),

    description: Joi.string()
        .min(10)
        .max(1000)
        .optional()
        .messages({
            'string.min': 'La description doit contenir au moins 10 caractères',
            'string.max': 'La description ne peut pas dépasser 1000 caractères'
        }),

    anneePublication: Joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear())
        .optional()
        .messages({
            'number.base': 'L\'année doit être un nombre',
            'number.integer': 'L\'année doit être un nombre entier',
            'number.min': 'L\'année doit être supérieure à 1000',
            'number.max': 'L\'année ne peut pas être supérieure à l\'année en cours'
        })
});

module.exports = livreSchema;