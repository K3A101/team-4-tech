# Git strategie
In dit pagina gaat u weten over de strategie die we gaan toepassen in ons team. Een goede uitgewerkte git strategie zorgt ervoor dat werkwijze binnen het team soepel blijft. Kortom een soort van  samenwerking contract dat de teamleden moet houden. 



## Issues als to do lijst

![Issues](/assets/issues.png)
 
Github heeft verschillende functionaliteiten om samenwerking te bevorderen. In van hen is issues. In een normale geval wordt issues gebruikt om problemen van een applicatie aan te vermelden, in het kort bugs.

Maar wij gaan issues gebruiken als een **to do lijst**. Hiermee kunnen we de taken overzichtelijk houden.

### Voordelen
- Taken naar teamlid verwijzen
- Beknopte versie van het todo lijst die we in projects hebben.
- Het issue een label geven, handig bij het sorteren van de issues. 
- Commentaar geven aan de issues. 


Issues is een manier om de to do lijst beknopt te houden. Met de labels kunnen je een beeld krijgen over wat de issues zijn. 

---

##  Project: De Trello van github

![Project](/assets/projecten.png)

 Er is een andere manier om to do lijst in github te maken. Met Project, het lijkt op trello. Het bestaat uit kolommen waarmee je de taken kan toevoegen. De taken worden cards genoemd. Maar wij hadden alle taken omgezet in issue. 
 
 Hiermee kunnen zijn de taken makkelijk te vinden. Het verschil tussen project en issue is, dat je de taken kan verdelen in bepaalde categorieen. Wij hebben vier categorieen gemaakt: to do,  in progresss, review, en done.

 Taken die in de categorie review zijn features die eerst door alle teamleden goedgekeurd zijn voordat die toegevoegd  wordt in de applicatie. 
 
 ### Voordelen:
 - Taken omzetten in issues
 - Checklist maken
 - Mijlpalen maken zoals To do, In progress, review en done.
 - taak aan iemand verwijzen.
 - Weet wat het proces van de taken zijn. 

 
 
## Branches per feature

![Branches](/assets/branches.png)

Een github repository is te vergelijken zoals een boom met allerlei vertakkingen. De vertakkingen worden in dit geval branches genoemd. De hoofdvertakking van de repository is de main. Dus een branch is een andere versie van de main.

 Branches worden gebruikt om aan een bepaalde functionaliteit te werken zonder de main te verpesten. Het voordeel hiervan is dat als iets niet goed werkt bij de huidige branch, kunnen  je bij de eerdere versie van de main te gaan en  verder werken. Om verandering van het branch in de main toe te voegen moet je een pull request doen. Dat is letterlijk een soort van toestemming vragen om verandering in de main te plaasten. 

### Hoe werkt het

#### Branch maken

Eerst hebben we branches gemaakt in github. Je kan ook via de terminal maar voor ons was het via de gui en browser makkelijk. Bij de main kun je verschillende branches maken.

 Wij hebben besloten om **branches per functionaliteit** te gebruiken. Als een van ons klaar zijn met de branch wordt die verwijdert of gesloten. Dan blijft de lijst overzichtelijk en ordelijk. 


 #### Pull request
 Als iedereen klaar zijn met hun branch, kunnen ze niet zomaar mergen. Wij doen eerst een pull request en vraag voor feedback. Als de verandering goedgekeurd is door iedereen, dan kunnen ze de branch mergen met main. Dus voor ons is de pull request moment waar iedereen aan de verandering kunnen bekijken, zodat iedereen op de hoogte blijft. 

##### Voordelen
- Een tijdlijn zien van alle commits van die branch.
- Teamleden verwijzen om de pull request te beoordelen en goedkeuren
- Feedback geven op bepaalde onderdeel van de pull request


## Community files 
Als community files, hebben we alleen een README. Met een readme kunnen we ons applicatie beknopt uitleggen. 

Wat in het readme moet staan:
- Een korte beschrijving van het prototype.
- Welke functionaliteiten in het prototype komen te staan.
- Hoe je de applicatie kunnen installeren en lokaal clonen.
- Link van live demo.
- Wie heeft bijgedragen in het project.
- Welke licentie wij gebruiken. 
- Bronnen die wij hadden gebruikt. 


### Linters en formatters
Elk teamlid heeft zijn eigen manier van code schrijven, iemand wilt liever alleen div's gebruiken met classes en andere aparte css bestanden met css selectors enzovoorts. Dus wij dachten om een linters te gebruiken. 

Een linter is een applicatie die ervoor zorgt dat de coding stijl consistent blijft, dan vooromt je errors en andere bugs. De linters die we gebruiken de eslint en stylelint. Eslint is een linter die gebruikt wordt bij javascript. Stylint is een linter die gebruikt wordt bij css.


### Eslint
#### Hoe wordt eslint geinstalleerd ?

- eslint installeren met `npm install eslint --save-dev`.
- configuratiebestand maken met `npm init @eslint/config`.
- een script maken om eslint te runnen `npx eslint yourfile.js`.
- regels zetten in de eslint coniguratie bestand.


**Mogelijke regels:**
- Comments plaasten bij javascript, css, HTML
- ESLINT gebruiken als linter 
- Stylint extensies downloaden voor css
- Oude gecomenteerde codes weghalen
- Etra witruimte weghalen
- Console.log weghalen


### Stylint
#### Hoe wordt stylelint geinstalleerd ?
- stylint installeren met `npm install --save-dev stylelint stylelint-config-standard` of de stylint extensions installeren.
- Een configuratiebestand `stylintrc.json` maken.
- Stylint Runnen met `npx stylelint "**/*.css"`