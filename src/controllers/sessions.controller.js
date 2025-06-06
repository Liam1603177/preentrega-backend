import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const register = async (req, res) => {
  res.send({ status: 'success', message: 'Usuario registrado correctamente' });
};

export const login = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).send({ status: 'error', error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ user }, config.jwtSecret, { expiresIn: '1h' });

  res
    .cookie('coderToken', token, {
      httpOnly: true,
      secure: false,
    })
    .send({ status: 'success', message: 'Login exitoso' });
};

export const logout = (req, res) => {
  res.clearCookie('coderToken').send({ status: 'success', message: 'Logout exitoso' });
};

export const getCurrent = (req, res) => {
  res.send({ status: 'success', user: req.user });
};
