const fs = require('fs').promises;
const path = './src/data/carts.json';

class CartManager {
    async getCartById(cid) {
        try {
            const data = await fs.readFile(path, 'utf8');
            const carts = data ? JSON.parse(data) : [];
            return carts.find(cart => cart.id === Number(cid));
        } catch (error) {
            console.error('Error al obtener carrito:', error);
            return null;
        }
    }

    async addCart() {
        try {
            console.log('📌 Intentando leer el archivo de carritos...');
    
            let carts = [];
            try {
                const data = await fs.readFile(path, 'utf8');
                carts = data ? JSON.parse(data) : [];
                console.log('✅ Archivo leído correctamente:', carts);
            } catch (error) {
                console.log('⚠️ No se encontró el archivo, se usará un array vacío.');
            }
    
            const newCart = { id: carts.length + 1, products: [] };
            carts.push(newCart);
    
            console.log('🛒 Nuevo carrito creado:', newCart);
    
            await fs.writeFile(path, JSON.stringify(carts, null, 2));
    
            console.log('✅ Carrito guardado en el archivo.');
            return newCart;
        } catch (error) {
            console.error('❌ Error al crear carrito:', error);
            return null;
        }
    }
    

    async addProductToCart(cid, pid) {
        try {
            const data = await fs.readFile(path, 'utf8');
            const carts = data ? JSON.parse(data) : [];
            const cart = carts.find(cart => cart.id === Number(cid));

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
            console.error('Error al agregar producto al carrito:', error);
            return null;
        }
    }
}

module.exports = CartManager;
