export default function auth(req, res, next) {
  if (!req.user) return res.status(401).render('login', { message: 'Debes estar logueado' });
  next();
}
