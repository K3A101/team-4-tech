# Back end Topic: Error Handling 

Onderzocht door: Keïsha Alexander.

Als backend topic heb ik error handling gekozen. Er zijn twee manieren van Error handling. Client side en Server side error handling. Ik ga focussen op het server side error handling. 

## Server side Error handling
Wat is server side error handling ? 

> Foutafhandeling die verwijst naar het anticiperen, detecteren en oplossen van programmeer-, applicatie- en communicatiefouten.
> Bron: https://www.techtarget.com/searchsoftwarequality/definition/error-handling

Maar de fouten wordt binnen de server gedectecteerd. 

Ik wilde ingevoerde data uit de registratie formulier valideren voordat ze in die database komt.  Dus gebruikers kan niet zomaar gegvens in het formulier invullen. De validatie voorkomt dat er rare gegvens in het database komt. Als de gebruiker iets verkeerd invult, komt een foutmelding  in de console log te staan.  Om het user friendly te maken had ik de foutmelding zichtbaar gemaakt zoals het voorbeeld hieronder aan. 

![Foutmelding](/assets/validatie.png)
Dit gebeurt er wanneer de gebruiker niks in het formulier invult, alle foutmelding komt tevoorschijn.



![Foutmelding](/assets/email.png)
Hier is een instantie waar de gebruiker geen geldige email had ingevoerd. 

### Express validator
Er zijn verschillende manieren hoe je data vanuit de server kan valideren. In dit project heb gebruikt gemaakt van express validator. Express validator is een npm package die makkelijk te installeren is. Als volgende ga ik stap voor stap uitleggen hoe ik dit topic had geimplemnteerd in het applicatie.


### Installatie
Ten eerste heb ik de package geinstalleerd volgens de documentatie van express validator. 
#### Package installeren.
`npm install --save express-validator`

#### Validatie code
Ik heb daarna een js bestand gemaak, die heet user-validation.js. In dit bestand komt de code van de validatie te staan. Hier kunt hoe het eruit ziet. 

```Javascript
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
```

Ik heb daarna de user-validation.js bestand in het server als een module gekopeld met de volgende code onederaan.

```Javascript
// app.js
const {check , validationResult } = require('express-validator');

const {
	validateUserSignUp,
	userValidation,
} = require('./middleware/user-validation');
```