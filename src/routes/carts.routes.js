const express = require('express');
const router = express.Router();
const CartManager = require('../models/CartManager');

const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart();
        if (!newCart) {
            return res.status(500).json({ error: 'No se pudo crear el carrito' });
        }
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener los productos de un carrito
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        console.error('Error al obtener carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addProductToCart(cid, pid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
