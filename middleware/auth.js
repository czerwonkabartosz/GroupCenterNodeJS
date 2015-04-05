module.exports = function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    }

    req.user = req.session.user;

    res.user = req.session.user;
    res.locals.user = res.user;

    next();
};