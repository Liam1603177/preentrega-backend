const Cart = require('../models/Cart');


// Obtener los productos de un carrito
async function getCart(req, res) {
    try {
        const { cid } = req.params;

        // Buscar el carrito por su ID y hacer populate de los productos
        const cart = await Cart.findById(cid).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        res.render('cart', {
            cart,
            products: cart.products,
        });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ status: 'error', message: 'Error al obtener el carrito' });
    }
}

module.exports = {
    getCart,
};
