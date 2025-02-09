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

    // Agregar un nuevo producto
    async addProduct(product) {
        try {
            // Leer los productos existentes
            const products = await this.getProducts();

            // Crear un nuevo ID (asegurando que no se repita)
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

            // Crear el producto con el nuevo ID y otros campos
            const newProduct = {
                id: newId,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status !== undefined ? product.status : true,
                stock: product.stock,
                category: product.category,
                thumbnails: product.thumbnails || []
            };

            // Agregar el producto a la lista
            products.push(newProduct);

            // Guardar los productos actualizados en el archivo
            await fs.writeFile(path, JSON.stringify(products, null, 2));
            
            return newProduct; // Devolver el producto con el ID generado
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            throw error;
        }
    }
}

module.exports = new ProductManager();
