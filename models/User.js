const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    voornaam: {
        type: String,
        required: true                 /* Door hier 'required' aan toe te voegen geven we aan dat dit veld ingevuld MOET worden. */
    },
    achternaam: {
        type: String,
        required: true
    },
    gebruikersnaam: {
        type: String,
        required: true,
        unique: true                 /* Door hier 'unique' aan toe te voegen geven we aan dat er geen twee accounts met dezelfde username gemaakt kunnen worden.*/
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    wachtwoord: {
        type: String,
        required: true
    }
},
{collection: 'users'})

const User = mongoose.model('User', UserSchema)
module.exports = User