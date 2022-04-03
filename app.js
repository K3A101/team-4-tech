const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { urlencoded } = require('express');
const app = express();
const router = express.Router();
const {
	checkAuthenticated,
	checkNotAuthenticated,
} = require('./middleware/authentification');
const {
	validateUserSignUp,
	userValidation,
} = require('./middleware/user-validation');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv').config();

// dependecies
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

// connect mongoose
const mongoose = require('mongoose');
const User = require('./models/User');
const dbURI = process.env.DB_URI;
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('connected to database'))
	.catch((err) => console.log(err));

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
// Home route
app.get('/', async (req, res) => {
	homePage(req, res);
});

// Aanmelden formulier
app.get('/aanmelden', checkNotAuthenticated, (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;
	if (loggedInUser) {
		res.render('profile', { user: loggedInUser, title: "Profile" });
	} else {
		res.render('aanmelden', { user: loggedInUser, title: "Aanmelden" });
	}
});

// Registreren formulier
app.get('/registreren', (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;
	const err = null;

	res.render('registreren', { user: loggedInUser, err: err, title: "Registreren" });
});

// introduction page
app.get('/introduction', (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;

	res.render('introduction', { user: loggedInUser, title: "Introduction" });
});

// Detail page of each country
app.get('/country/:country', async (req, res) => {
	countryDetailPage(req, res);
});

// profile page
app.get('/profile', (req, res) => {
	profilePage(req, res);
});

// route for sing-in form
app.post(
	'/aanmelden',
	passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/registreren',
		failureFlash: true,
	})
);

// route for singing out
app.get('/logout', (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;
	req.session.destroy();
	res.redirect('/aanmelden');
});

// route for register a user
app.post(
	'/registreren',
	validateUserSignUp,
	userValidation,
	async (req, res) => {
		AddNewUserForm(req, res);
	}
);

// Lijst met de favoriete landen van een user
app.get('/mijnlijst', async (req, res) => {
	MyListPage(req, res);
});

// Voeg iets toe aan mijn-lijst
app.post('/mijnlijst/add', async (req, res) => {
	addCountryToFavorites(req, res);
});

// Remove a favorite country from favorites
app.post('/mijn-lijst/delete/:id', async (req, res) => {
	RemoveCountryFromList(req, res);
});

// match me with random country
app.get('/match-me', async (req, res) => {
	MatchMePage(req, res);
});

// Add a matched country to favorites
app.post('/match-me/add', async (req, res) => {
	AddCountryFromMatchMePage(req, res);
});

// 404 page
app.get('*', function (req, res) {
	res.status('CANNOT FIND PAGE ERROR 404 (oepsie)', 404);
});

// Start server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// Pages
const homePage = async (req, res) => {
	const data = await fetch('https://restcountries.com/v2/all');
	const countries = await data.json();
	const loggedInUser = req.session.user ? req.session.user : null;

	res.render('home', {
		countries: countries,
		user: loggedInUser,
		title: "Landen"
	});
};
const countryDetailPage = async (req, res) => {
	const ress = await fetch(
		`https://restcountries.com/v2/alpha/${req.params.country}`
	);
	const countryData = await ress.json();
	const loggedInUser = req.session.user ? req.session.user : null;

	res.render('countryDetail', {
		data: countryData,
		user: loggedInUser,
		title: req.params.country
	});
};
const profilePage = (req, res) => {
	req.session.user = req.user;
	req.session.save();
	const loggedInUser = req.session.user ? req.session.user : null;

	if (loggedInUser) {
		res.render('profile', {
			user: loggedInUser,
			title: "Profiel"
		});
	} else {
		res.redirect('/aanmelden');
	}
};
const MatchMePage = async (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;
	const data = await fetch('https://restcountries.com/v2/all');
	const countries = await data.json();

	const randomInt = Math.floor(Math.random() * countries.length) + 1;

	if (loggedInUser) {
		const user = await User.findOne({ email: loggedInUser.email });
		res.render('match-me', { user: user, data: countries[randomInt], title: "Match me" });
	} else {
		res.redirect('/aanmelden');
	}
};
const MyListPage = async (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;

	if (loggedInUser) {
		const user = await User.findOne({ email: loggedInUser.email });
		res.render('mijnlijst', { user: user, title: "Mijn lijst" });
	} else {
		res.redirect('/aanmelden');
	}
};

// Page Functions
const AddNewUserForm = async (req, res) => {
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
			await res.redirect('/aanmelden');
			console.log('Account succesvol aangemaakt');
		} catch (error) {
			console.log(error);
			await res.redirect('/registreren');
		}
	}
};
const addCountryToFavorites = async (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;

	let form = {
		land: req.body.land,
		populatie: req.body.populatie,
		regio: req.body.regio,
		capital: req.body.capital,
		language: req.body.language,
		alpha: req.body.alpha,
	};

	if (!loggedInUser) {
		res.redirect('/aanmelden');
	} else {
		const user = await User.findOne({ email: loggedInUser.email });
		user.countries.push(form);
		await user.save();
	}
};
const RemoveCountryFromList = async (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;

	const test = await User.findOneAndUpdate(
		{ email: loggedInUser.email },
		{ $pull: { countries: { alpha: req.params.id } } },
		{ new: true }
	);

	res.redirect('/mijnlijst');
};
const AddCountryFromMatchMePage = async (req, res) => {
	const loggedInUser = req.session.user ? req.session.user : null;

	let form = {
		land: req.body.land,
		populatie: req.body.populatie,
		regio: req.body.regio,
		capital: req.body.capital,
		language: req.body.language,
		alpha: req.body.alpha,
	};

	const user = await User.findOne({ email: loggedInUser.email });
	user.countries.push(form);
	await user.save();

	res.redirect('/match-me');
};
