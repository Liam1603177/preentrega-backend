import { Router } from 'express';
import passport from 'passport';
import {
  register,
  login,
  logout,
  getCurrent
} from '../controllers/sessions.controller.js';
import { passportCall } from '../middlewares/passportCall.js';
import { authorization } from '../middlewares/authorization.js';
const router = Router();

// Registro
router.post('/register', passport.authenticate('register', { session: false, failureRedirect: '/failregister' }), register);

// Login
router.post('/login', passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }), login);

// Logout
router.post('/logout', logout);

// Current user con JWT
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrent);

router.get('/perfil', passportCall('jwt'), authorization('user'), (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

export default router;
