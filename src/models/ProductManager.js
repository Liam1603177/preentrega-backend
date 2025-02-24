const fs = require('fs').promises;
const path = './src/data/products.json';

class ProductManager {
    // Obtener todos los productos
    async getProducts() {
        try {
            const data = await fs.readFile(path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Obtener un producto por ID
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === parseInt(id));
    }

    // Agregar un nuevo producto
    async addProduct(product) {
        try {
            console.log("Datos recibidos:", product);
            const products = await this.getProducts();
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            const newProduct = { id: newId, ...product };
            products.push(newProduct);
            await fs.writeFile(path, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            throw error;
        }
    }
    

    // Actualizar un producto por ID
    async updateProduct(id, updatedData) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === parseInt(id));

            if (index !== -1) {
                products[index] = { ...products[index], ...updatedData };
                await fs.writeFile(path, JSON.stringify(products, null, 2));
                return products[index];
            }
            return null;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw error;
        }
    }

    // Eliminar un producto por ID
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter(product => product.id !== parseInt(id));

            if (updatedProducts.length !== products.length) {
                await fs.writeFile(path, JSON.stringify(updatedProducts, null, 2));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw error;
        }
    }
}

// Exportar la clase ProductManager
module.exports = ProductManager;
