function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/aanmelden');
    }
    next();
}

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/profile')
}

module.exports = {
    checkNotAuthenticated,
    checkAuthenticated,
}