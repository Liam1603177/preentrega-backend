import passport from 'passport';

export const passportCall = (strategy) => {
return (req, res, next) => {
passport.authenticate(strategy, { session: false }, (err, user, info) => {
if (err) return next(err);
if (!user) return res.status(401).json({ message: 'No autorizado', info });
req.user = user;
next();
})(req, res, next);
};
};