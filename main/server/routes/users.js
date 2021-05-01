const _ = require('lodash');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
  const users = await User.find()
    .select({ name: 1, email: 1 })
    .sort('name');
  res.send(users);
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
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
});

module.exports = router;
