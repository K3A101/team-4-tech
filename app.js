//express zorgt ervoor dat je jouw site localhost kan hosten
//en pagina's kan maken met app.get

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { urlencoded } = require('express');

const app = express();
const router = express.Router();

const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');
const {
	checkAuthenticated,
	checkNotAuthenticated,
} = require('./middleware/authentification');

const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const {
	validateUserSignUp,
	userValidation,
} = require('./middleware/user-validation');

const port = process.env.PORT || 3000;

const dotenv = require('dotenv').config();
// const { MongoClient } = require('mongodb');
// const { ObjectId } = require('mongodb');

// connect mongoose
const mongoose = require('mongoose');
// const myId = mongoose.Types.ObjectId;
const User = require('./models/User');

const dbURI = process.env.DB_URI;
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) =>
		console.log('connected to database')
	) /* Console.log om te checken of er een succesvolle connectie met de database is */
	.catch((err) => console.log(err));

const fetch = require('node-fetch');
// const { checkNotAuthenticated } = require('./middleware/authentification');

// Initieer passport (Gebruiker validatie)
const initializePassport = require('./middleware/passport');
const bcryptjs = require('bcryptjs');
initializePassport(
	passport,
	async (email) => {
		const userIsFound = await User.findOne({ email });
		return userIsFound;
	},
	async (id) => {
		const userIsFound = await User.findOne({ _id: id });
		return userIsFound;
	}
);

app.use(bodyParser.json());
const bodyParserUrlEncoded = app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// let db = null;
app.use(express.static('public'));
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET_CODE,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// gebruik van ejs
app.use(expressLayouts);
app.set('layout', './partials/layout');
app.set('view engine', 'ejs');

/* routes */
app.get('/', async (req, res) => {
	const ress = await fetch('https://restcountries.com/v2/all');
	const countries = await ress.json();
	const loggedInUser = req.session.user ? req.session.user : null;

	res.render('home', {
		countries: countries,
		user: loggedInUser,
	});
});

// Aanmelden formulier
app.get('/aanmelden', checkNotAuthenticated, (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;
	if (loggedInUser) {
		res.render('profile', { user: loggedInUser });
	} else {
		res.render('aanmelden', { user: loggedInUser });
	}
});

// Registreren formulier
app.get('/registreren', (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;

	res.render('registreren', { user: loggedInUser });
});

// introduction page

app.get('/introduction', (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;

	res.render('introduction', { user: loggedInUser });
});

app.get('/country/:country', async (req, res) => {
	const ress = await fetch(
		`https://restcountries.com/v2/alpha/${req.params.country}`
	);
	const countryData = await ress.json();
	const loggedInUser = req.session.user ? req.session.user : null;

	res.render('countryDetail', {
		data: countryData,
		user: loggedInUser,
	});
});

app.get('/profile/', (req, res) => {
	req.session.user = req.user;
	req.session.save();
	const loggedInUser = req.session.user ? req.session.user : null;

	console.log('test', req.session.user);

	if (loggedInUser) {
		res.render('profile', {
			user: loggedInUser,
		});
	} else {
		res.redirect('/aanmelden');
	}
});

app.post(
	'/aanmelden',
	passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/registreren',
		failureFlash: true,
	})
);

app.get('/logout', (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;
	req.session.destroy();
	res.redirect('/aanmelden');
});

app.post('/registreren', async (req, res) => {
	const userIsFound = await User.findOne({
		email: req.body.email,
		gebruikersnaam: req.body.gebruikersnaam,
	});

	if (userIsFound) {
		req.flash('error', 'Er bestaat al een account met dit emailadres.');
		res.redirect('/registreren');
	} else {
		try {
			const passwordHash = await bcryptjs.hash(req.body.wachtwoord, 10);
			const user = new User({
				voornaam: req.body.voornaam,
				achternaam: req.body.achternaam,
				gebruikersnaam: req.body.gebruikersnaam,
				email: req.body.email,
				wachtwoord: passwordHash,
			});

			await user.save();
			// await db.collection('users').insertOne(user)
			res.redirect('/aanmelden');
			console.log('Account succesvol aangemaakt');
		} catch (error) {
			console.log(error);
			console.log('Er is iets fout gegaan');
			res.redirect('/registreren');
		}
	}
});
/*app.get('/contact', async (req, res) => {
    const ress = await fetch('https://restcountries.com/v2/all');
    const countries = await ress.json();

    res.render('contact', {
        countries: countries

    });

})*/

// mijn lijst, rendert een title en allelanden dus landen.land etc die later worden ingesteld
app.get('/mijnlijst', async (req, res) => {
	const allelanden = await db.collection('landen').find().toArray();
	const title = 'Mijn landen';
	res.render('mijnlijst', {
		title,
		allelanden,
	});
});
app.get('*', function (req, res) {
	res.status('CANNOT FIND PAGE ERROR 404 (oepsie)', 404);
});

/*****************************************************
 * Connect to database
 ****************************************************/
// Sonja haar uitleg
// async function connectDB() {
//     const uri = process.env.DB_URI;
//     const client = new MongoClient(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     try {
//         await client.connect();
//         db = client.db(process.env.DB_NAME);
//     } catch (error) {
//         throw error;
//     }
// }

/*webserver starten*/

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	// connectDB().then(() => console.log("We have a connection to Mongo!"));
});

//database inhoud sturen en ophalen: hulp van Sonja
/*
app.post("/save-countries", (req, res) => {
    console.log(req.body)

    res.redirect("/mijnlijst")
})*/

// app.post('/mijnlijst', async (req, res) => {

//     // landinfo toevoegen via het id die in script.js is aangegeven in het aanmaken van formulier

//     let form = {

//         land: req.body.land,

//         populatie: req.body.populatie,

//         regio: req.body.regio,

//         capital: req.body.capital,

//         language: req.body.language
//     };

//     // connection
//     // stuurt het als een form
//     await db.collection('landen').insertOne(form);

//     const allelanden = await db.collection('landen').find().toArray();

//     // render de gestuurde data naar pagina

//     const title = "Mijn landen";

//     res.render('mijnlijst', {
//         title,
//         allelanden
//     });

// });

// delete functie
// app.post("/delete/:id",
//     async (req, res) => {

//         db.collection('landen').deleteOne({
//             _id: ObjectId(req.params.id)
//         })
//         res.redirect("/mijnlijst");
//     });

//Sam slotenmaker vertelde over ObjectId(req.params.id) ipv dat ik _id: MyId moest gebruiken
