const _ = require('lodash');
const auth = require('../middleware/auth');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .select({ name: 1, email: 1 })
      .sort('name');
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['email', 'password', 'name']));

    await user.hashPassword();

    await user.save();

    const token = user.generateAuthToken();
    res
      .header('x-auth-token', token)
      .send(_.pick(user, ['_id', 'name', 'email']));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
