const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Le nom est requis',
            'string.min': 'Le nom doit contenir au moins 2 caractères',
            'string.max': 'Le nom ne peut pas dépasser 50 caractères'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'L\'email est requis',
            'string.email': 'L\'email n\'est pas valide'
        }),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.empty': 'Le mot de passe est requis',
            'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
            'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
        })
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'L\'email est requis',
            'string.email': 'L\'email n\'est pas valide'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Le mot de passe est requis'
        })
});

module.exports = { registerSchema, loginSchema };