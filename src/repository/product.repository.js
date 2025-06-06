import ProductManager from '../dao/mongo/managers/ProductManager.js';

const productManager = new ProductManager();

export default class ProductRepository {
  async getProducts(filters, options) {
    return await productManager.getAll(filters, options);
  }

  async getProductById(id) {
    return await productManager.getById(id);
  }

  async createProduct(data) {
    return await productManager.create(data);
  }

  async updateProduct(id, data) {
    return await productManager.update(id, data);
  }

  async deleteProduct(id) {
    return await productManager.delete(id);
  }
}
