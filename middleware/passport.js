const localStrat = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, wachtwoord, done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: "Incorrect email" });
        }

        try{
            if(await bcryptjs.compare(wachtwoord, user.wachtwoord)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Wachtwoord klopt niet" });
            }
        }catch(err){
            return done(e)
        }
    };
    passport.use(new localStrat({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        return done(null, await getUserById(id));
    });
}

module.exports = initialize;