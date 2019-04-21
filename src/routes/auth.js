const { User, validateAuth } = require('../models/user');
const express = require('express');
const router = express.Router();
const Joi = require('Joi');

router.post('/', async (req, res) => {
  const fault = 'Cannot log in user.';
  try {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(fault);

    const validPassword = await user.validatePassword(req.body.password);
    if (!validPassword) return res.status(400).send(fault);

    const token = user.generateAuthToken();

    res.send({ token: token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
