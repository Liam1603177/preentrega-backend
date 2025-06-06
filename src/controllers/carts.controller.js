import CartManager from '../dao/mongo/managers/CartManager.js';

const cartManager = new CartManager();

export const getCarts = async (req, res) => {
try {
const carts = await cartManager.getCarts();
res.json(carts);
} catch (error) {
res.status(500).json({ error: 'Error al obtener los carritos' });
}
};

export const getCartById = async (req, res) => {
try {
const { cid } = req.params;
const cart = await cartManager.getCartById(cid);
if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
res.json(cart);
} catch (error) {
res.status(500).json({ error: 'Error al obtener el carrito' });
}
};

export const createCart = async (req, res) => {
try {
const newCart = await cartManager.createCart();
res.status(201).json(newCart);
} catch (error) {
res.status(500).json({ error: 'Error al crear el carrito' });
}
};

export const addProductToCart = async (req, res) => {
try {
const { cid, pid } = req.params;
const updatedCart = await cartManager.addProductToCart(cid, pid);
if (!updatedCart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
res.json(updatedCart);
} catch (error) {
res.status(500).json({ error: 'Error al agregar el producto' });
}
};

export const updateCart = async (req, res) => {
try {
const { cid } = req.params;
const { products } = req.body;
const updatedCart = await cartManager.updateCart(cid, products);
if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
res.json(updatedCart);
} catch (error) {
res.status(500).json({ error: 'Error al actualizar el carrito' });
}
};

export const updateProductQuantity = async (req, res) => {
try {
const { cid, pid } = req.params;
const { quantity } = req.body;
const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
if (!updatedCart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
res.json(updatedCart);
} catch (error) {
res.status(500).json({ error: 'Error al actualizar la cantidad' });
}
};

export const removeProduct = async (req, res) => {
try {
const { cid, pid } = req.params;
const updatedCart = await cartManager.removeProduct(cid, pid);
if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
res.json({ message: 'Producto eliminado del carrito' });
} catch (error) {
res.status(500).json({ error: 'Error al eliminar el producto' });
}
};

export const clearCart = async (req, res) => {
try {
const { cid } = req.params;
const clearedCart = await cartManager.clearCart(cid);
if (!clearedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
res.json({ message: 'Carrito vaciado correctamente' });
} catch (error) {
res.status(500).json({ error: 'Error al vaciar el carrito' });
}
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartManager.purchaseCart(cid);
    if (!result) return res.status(404).json({ error: 'Carrito no encontrado o vacío' });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
};
