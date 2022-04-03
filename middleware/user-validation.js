const {
    check,
    validationResult
} = require('express-validator');

// Data die ingevoerd wordt via de registreert wordt gevalideert.
exports.validateUserSignUp = [
    check('voornaam').trim().not().isEmpty().withMessage('Voornaam is leeg').isLength({
        min: 3,
        max: 20
    }).withMessage('Voornaam moet tussen 3 en 20 karakters zijn'),
    check('achternaam').trim().not().isEmpty().withMessage('Achternaam is leeg').isLength({
        min: 3,
        max: 20
    }).withMessage('Achternaam moet tussen 3 en 30 karakters zijn'),
    check('email').normalizeEmail().isEmail().withMessage('Email is niet geldig'),
    check('gebruikersnaam').trim().not().isEmpty().withMessage('Gebruikersnaam is leeg').isLength({
        min: 3,
        max: 30
    }).withMessage('Voornaam moet tussen 3 en 30 karakters zijn'),
    check('wachtwoord').trim().not().isEmpty().withMessage('Wachtwoord is leeg').isLength({
        min: 3,
        max: 20
    }).withMessage('Wachtwoord moet tussen 3 en 20 karakters lang zijn')
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
	const loggedInUser = req.session.user ? req.session.user : null;

    if (result.length > 0) {
        res.render('registreren', {
            err: result,
            user: loggedInUser,
            title: "Registreren"
        });
    } else {
        return
    }
}