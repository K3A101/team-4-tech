 const {
     check,
     validationResult
 } = require('express-validator');


 exports.validateUserLogin = [
     check('email').normalizeEmail().isEmail().withMessage('Email is niet geldig'),

     check('wachtwoord').not().isEmpty().withMessage('Wachtwoord is verplicht!'),
      
     check('wachtwoord').exists().custom((value, {req }) => {
                 if (value !== req.body.wachtwoord) {
                     throw new Error('Wachtwoord is niet correct');
                 }else {
                     return 
                 }
                }
                 
                 )
                
 ]

 exports.loginResult = (req, res, next) => {
     const result = validationResult(req).array();
     const loggedInUser = req.session.user ? req.session.user : null;

     if (result.length > 0) {
         res.render('aanmelden', {
             user: loggedInUser,
             err: result
         });
     } else {
         return 
     }
 }