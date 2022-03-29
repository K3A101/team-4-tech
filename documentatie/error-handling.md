# Back end Topic: Error Handling 

Onderzocht door: Keïsha Alexander.

Ik error handling gekozen als backend topic. Er zijn twee manieren van Error handling. Client side en Server side error handling.
Ik ga focussen op het server side error handling. 

## Server side Error handling
Wat is server side error handling ? 

> Foutafhandeling verwijst naar het anticiperen, detecteren en oplossen van programmeer-, applicatie- en communicatiefouten.
> Bron: https://www.techtarget.com/searchsoftwarequality/definition/error-handling

Maar de fouten wordt binnen de server gedectecteerd. 

Ik wilde ingevoerde data uit de registratie formulier valideren voordat in die database komt.  Dus gebruikers kan niet zomaar gegvens in het formulier invullen. Dit zorgt ervoor dat er rare gegvens in je database komen. Als de gebruiker iets verkeerd invult, komt de foutmelding  in de console log te staan.  Om het user friendly te maken ga ik ook een client side validatie doen. 


### Express validator
Om ingevoerde gegevens via de server te valideren heb ik de package `express-validator gebruikt.

### Installatie

#### Package installeren.
`npm install --save express-validator`

#### Express validator toevoegen in server
Ik heb een middelware gemaakt en dan de ... koppelen. 
```Javascript
const {check , validationResult } = require('express-validator');


```