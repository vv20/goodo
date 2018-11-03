function requiresLogin(req, res, next) {
    if (req.session && req.session.username) {
        return next();
    } else {
        const err = {
            message: 'You must be logged in to view this page.',
            status: 401
        };
        return next(err);
    }
}

exports.requiresLogin = requiresLogin;
