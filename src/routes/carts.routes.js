const Cart = require('../models/Cart');
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

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        // Filtramos para eliminar el producto
        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();

        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Actualizar el carrito
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body; // Array con productos y cantidades

    try {
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        cart.products = products; // Reemplazamos todo el carrito
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndex === -1) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });

        cart.products[productIndex].quantity = quantity;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
    }
});

// Vaciar el carrito
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        cart.products = []; // Vaciar el carrito
        await cart.save();

        res.json({ message: 'Todos los productos fueron eliminados del carrito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al vaciar el carrito' });
    }
});


router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los carritos' });
    }
});


module.exports = router;
