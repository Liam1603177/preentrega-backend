import CartModel from '../models/Cart.js';
import ProductModel from '../models/Product.js';
import TicketService from './ticket.service.js';

export default class PurchaseService {
  constructor() {
    this.ticketService = new TicketService();
  }

  async finalizePurchase(cartId, userEmail) {
    const cart = await CartModel.findById(cartId).populate('products.product');
    if (!cart) throw new Error('Carrito no encontrado');

    let totalAmount = 0;
    const productsWithoutStock = [];

    // Procesar productos del carrito
    for (const item of cart.products) {
      const product = item.product;
      if (!product) {
        productsWithoutStock.push(item.product._id);
        continue;
      }

      if (product.stock >= item.quantity) {
        // Actualizar stock
        product.stock -= item.quantity;
        await product.save();

        // Sumar total
        totalAmount += product.price * item.quantity;
      } else {
        // Stock insuficiente
        productsWithoutStock.push(product._id);
      }
    }

    // Filtrar productos que no se compraron para dejar en el carrito
    cart.products = cart.products.filter(
      (item) => !productsWithoutStock.includes(item.product._id)
    );

    await cart.save();

    // Crear ticket si se compró algo
    let ticket = null;
    if (totalAmount > 0) {
      ticket = await this.ticketService.createTicket(userEmail, totalAmount);
    }

    return { ticket, productsWithoutStock };
  }
}
