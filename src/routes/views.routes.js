import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import Product from '../dao/mongo/models/Product.js';
import { passportCall } from '../middlewares/passportCall.js';
import { authorization } from '../middlewares/authorization.js';

const router = Router();

// Página de inicio
router.get('/', (req, res) => {
  res.render('home');
});

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Página de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Perfil del usuario (protegida)
router.get('/profile', authMiddleware, (req, res) => {
  const user = req.user;
  res.render('profile', { user });
});


router.get('/perfil', passportCall('current'), authorization('user'), (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

// Vista en tiempo real de productos
router.get('/realtimeproducts', async (req, res) => {
  const products = await Product.find().lean();
  res.render('realTimeProducts', { products });
});

export default router;
