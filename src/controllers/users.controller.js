import UserRepository from '../repository/user.repository.js';
const userRepository = new UserRepository();

export const getUsers = async (req, res) => {
const users = await userRepository.getUsers();
res.json(users);
};

export const getUserById = async (req, res) => {
const user = await userRepository.getUserById(req.params.uid);
if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
res.json(user);
};

export const getUserByEmail = async (req, res) => {
const user = await userRepository.getUserByEmail(req.params.email);
if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
res.json(user);
};

export const createUser = async (req, res) => {
const user = await userRepository.createUser(req.body);
res.status(201).json(user);
};

export const deleteUser = async (req, res) => {
const result = await userRepository.deleteUser(req.params.uid);
if (!result) return res.status(404).json({ message: 'Usuario no encontrado' });
res.json({ message: 'Usuario eliminado' });
};