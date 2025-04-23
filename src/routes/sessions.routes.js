const express = require('express');
const passport = require('passport');
const { register, login } = require('../controllers/sessions.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
  res.json({ status: 'success', user: req.user });
});

module.exports = router;
