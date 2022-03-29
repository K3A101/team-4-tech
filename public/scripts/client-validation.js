const voornaam = document.getElementById('voornaam');
const achternaam = document.getElementById('achternaam');
const gebruikersnaam = document.getElementById('gebruikersnaam');
const email = document.getElementById('email');
const wachtwoord = document.getElementById('wachtwoord');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let message = []
    if(voornaam.value === '' || voornaam.value == null) {
        message.push('Voornaam is verplicht!')
    }

    if(wachtwoord.value.length <= 3) {
        message.push('Wachtwoord moet langer zijn dan 3 karakters')
    }

    if (wachtwoord.value.length >= 20) {
        message.push('Wachtwoord moet korter zijn dan 20 karakters')
    }
    
    if(message.length > 0) {
        e.preventDefault()
        errorElement.innerText = message.join(', ')
    }
    
})