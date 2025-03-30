const Cart = require('./Cart'); // Importamos el modelo de carrito

class CartManager {
    async getCartById(cid) {
        try {
            return await Cart.findById(cid).populate('products.product');
        } catch (error) {
            console.error('Error al obtener carrito por ID:', error);
            return null;
        }
    }

    async addCart() {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            return null;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) return null;

            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            return null;
        }
    }
}

module.exports = CartManager;
