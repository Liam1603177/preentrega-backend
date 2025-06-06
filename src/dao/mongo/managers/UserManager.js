import UserModel from '../models/User.js';

export default class UserManager {
  async getUsers() {
    return await UserModel.find();
  }

  async getUserById(uid) {
    const user = await UserModel.findById(uid);
    return user || null;
  }

  async getUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user || null;
  }

  async createUser(userData) {
    return await UserModel.create(userData);
  }

  async deleteUser(uid) {
    const user = await UserModel.findById(uid);
    if (!user) return null;

    return await UserModel.findByIdAndDelete(uid);
  }
}
