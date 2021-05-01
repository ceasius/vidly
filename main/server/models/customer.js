const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    phone: { type: String, required: false, minlength: 10, maxlength: 15 }
});
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(255)
            .required(),
        isGold: Joi.boolean().optional(),
        phone: Joi.string()
            .optional()
            .min(10)
            .max(15)
    });

    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;
module.exports.validate = validateCustomer;
