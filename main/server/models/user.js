const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

function generateAuthToken() {
  const privateKey = config.get('jwtPrivateKey');
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, privateKey);

  return token;
}

async function hashPassword() {
  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed;
  return hashed;
}

async function validatePassword(password) {
  const validPassword = await bcrypt.compare(password, this.password);
  return validPassword;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
  isAdmin: { type: Boolean, required: false, default: false }
});
userSchema.methods.generateAuthToken = generateAuthToken;
userSchema.methods.hashPassword = hashPassword;
userSchema.methods.validatePassword = validatePassword;

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string()
      .min(3)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  });
  
  return schema.validate(user);
}

function validateAuth(req) {
  const schema = Joi.object({
    email: Joi.string()
      .min(3)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  });
  return schema.validate(req);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validate = validateUser;
module.exports.validateAuth = validateAuth;
