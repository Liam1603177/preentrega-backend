const express = require('express');
const router = express.Router();
const CartManager = require('../models/CartManager');

const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = await cartManager.addCart();
    res.status(201).json(newCart);
});

// Obtener los productos de un carrito
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProductToCart(cid, pid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
});

module.exports = router;
