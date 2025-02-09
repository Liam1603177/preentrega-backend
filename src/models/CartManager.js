
const fs = require('fs').promises;
const path = './src/data/carts.json';

class CartManager {
    async getCartById(cid) {
        try {
            const data = await fs.readFile(path, 'utf8');
            const carts = JSON.parse(data);
            return carts.find(cart => cart.id === cid);
        } catch (error) {
            return null;
        }
    }

    async addCart() {
        try {
            const data = await fs.readFile(path, 'utf8');
            const carts = JSON.parse(data);
            const newCart = { id: carts.length + 1, products: [] };
            carts.push(newCart);
            await fs.writeFile(path, JSON.stringify(carts, null, 2));
            return newCart;
        } catch (error) {
            return null;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const data = await fs.readFile(path, 'utf8');
            const carts = JSON.parse(data);
            const cart = carts.find(cart => cart.id === cid);
            if (!cart) return null;

            const productIndex = cart.products.findIndex(product => product.product === pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            await fs.writeFile(path, JSON.stringify(carts, null, 2));
            return cart;
        } catch (error) {
            return null;
        }
    }
}

module.exports = CartManager;
