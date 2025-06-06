import CartManager from '../dao/mongo/managers/CartManager.js';

const cartManager = new CartManager();

export default class CartRepository {
  async getCarts() {
    return await cartManager.getCarts();
  }

  async getCartById(cid) {
    return await cartManager.getCartById(cid);
  }

  async createCart() {
    return await cartManager.createCart();
  }

  async addProduct(cid, pid) {
    return await cartManager.addProductToCart(cid, pid);
  }

  async updateQuantity(cid, pid, quantity) {
    return await cartManager.updateProductQuantity(cid, pid, quantity);
  }

  async removeProduct(cid, pid) {
    return await cartManager.removeProduct(cid, pid);
  }

  async clearCart(cid) {
    return await cartManager.clearCart(cid);
  }
}