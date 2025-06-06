import CartModel from "../models/Cart.js";
import ProductModel from "../models/Product.js";

export default class CartManager {
async getCarts() {
return await CartModel.find().populate("products.product");
}

async getCartById(cid) {
return await CartModel.findById(cid).populate("products.product");
}

async createCart() {
return await CartModel.create({ products: [] });
}

async addProductToCart(cid, pid) {
const cart = await CartModel.findById(cid);
if (!cart) return null;

const existingProduct = cart.products.find(
  (p) => p.product.toString() === pid
);

if (existingProduct) {
  existingProduct.quantity += 1;
} else {
  cart.products.push({ product: pid, quantity: 1 });
}

return await cart.save();

}

async updateProductQuantity(cid, pid, quantity) {
const cart = await CartModel.findById(cid);
if (!cart) return null;

const productToUpdate = cart.products.find(
  (p) => p.product.toString() === pid
);
if (!productToUpdate) return null;

productToUpdate.quantity = quantity;
return await cart.save();

}

async removeProduct(cid, pid) {
const cart = await CartModel.findById(cid);
if (!cart) return null;

cart.products = cart.products.filter(
  (p) => p.product.toString() !== pid
);
return await cart.save();

}

async clearCart(cid) {
const cart = await CartModel.findById(cid);
if (!cart) return null;

cart.products = [];
return await cart.save();

}

async updateCart(cid, products) {
const cart = await CartModel.findById(cid);
if (!cart) return null;

cart.products = products;
return await cart.save();

}

async purchaseCart(cid) {
const cart = await CartModel.findById(cid).populate("products.product");
if (!cart) return { success: false, cart: null };

const purchasedItems = [];
const rejectedItems = [];

for (const item of cart.products) {
  const product = await ProductModel.findById(item.product._id);
  if (!product) {
    rejectedItems.push(item.product._id.toString());
    continue;
  }

  if (product.stock >= item.quantity) {
    product.stock -= item.quantity;
    await product.save();
    purchasedItems.push(item);
  } else {
    rejectedItems.push(item.product._id.toString());
  }
}

// Actualizar el carrito dejando solo los productos no comprados
cart.products = cart.products.filter((item) =>
  rejectedItems.includes(item.product._id.toString())
);
await cart.save();

return {
  success: true,
  purchasedItems,
  rejectedItems,
  updatedCart: cart,
};

}
}
