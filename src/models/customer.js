const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    phone: { type: String, required: false, minlength: 10, maxlength: 15 }
});
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string()
            .min(3)
            .max(255)
            .required(),
        isGold: Joi.boolean().optional(),
        number: Joi.string()
            .optional()
            .min(10)
            .max(15)
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
