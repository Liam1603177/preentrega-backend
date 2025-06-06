import UserManager from '../dao/mongo/managers/UserManager.js';
const userManager = new UserManager();

export default class UserRepository {
async getUsers() {
return await userManager.getUsers();
}

async getUserById(uid) {
return await userManager.getUserById(uid);
}

async getUserByEmail(email) {
return await userManager.getUserByEmail(email);
}

async createUser(userData) {
return await userManager.createUser(userData);
}

async deleteUser(uid) {
return await userManager.deleteUser(uid);
}
}