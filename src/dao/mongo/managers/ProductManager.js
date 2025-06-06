import ProductModel from '../models/Product.js';

export default class ProductManager {
  async getProducts(filter = {}, options = {}) {
    return await ProductModel.paginate(filter, options);
  }

  async getProductById(pid) {
    const product = await ProductModel.findById(pid);
    return product || null;
  }

  async createProduct(productData) {
    return await ProductModel.create(productData);
  }

  async updateProduct(pid, updateData) {
    const product = await ProductModel.findById(pid);
    if (!product) return null;

    Object.assign(product, updateData);
    return await product.save();
  }

  async deleteProduct(pid) {
    const product = await ProductModel.findById(pid);
    if (!product) return null;

    return await ProductModel.findByIdAndDelete(pid);
  }
}
