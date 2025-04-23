const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const register = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = createHash(password);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });

    res.status(201).json({ status: 'success', user: newUser });
  } catch (error) {
    res.status(500).json({ status: 'error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !isValidPassword(user, password)) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, 'claveSecretaJWT', { expiresIn: '1h' });

    res.cookie('jwtCookie', token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000
    });

    res.json({ status: 'success', token });
  } catch (error) {
    res.status(500).json({ status: 'error', error });
  }
};

module.exports = {
  register,
  login
};
