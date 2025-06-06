import User from './User.js';
import Product from './Product.js';
import UserManager from '../managers/UserManager.js';


export default {
  User,
  Product,
};

export const userService = new UserManager();