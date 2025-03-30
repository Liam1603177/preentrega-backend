const Product = require('./Product'); // Importamos el modelo de producto

class ProductManager {
    async getProducts() {
        try {
            return await Product.find();
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            return null;
        }
    }

    async addProduct(productData) {
        try {
            const newProduct = new Product(productData);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            throw error;
        }
    }

    async updateProduct(id, updatedData) {
        try {
            return await Product.findByIdAndUpdate(id, updatedData, { new: true });
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            await Product.findByIdAndDelete(id);
            return true;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            return false;
        }
    }
}

module.exports = ProductManager;
