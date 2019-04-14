const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    phone: { type: String, required: false, minlength: 10, maxlength: 15 }
});
const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name');
        res.send(customers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateCustomer(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            number: req.body.number
        });

        customer = await customer.save();
        res.send(customer);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer)
            return res
                .status(404)
                .send('The customer with the given ID was not found.');

        const { error } = validateCustomer(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        customer.set({
            name: req.body.name,
            isGold: req.body.isGold,
            number: req.body.number
        });
        await customer.save();

        res.send(customer);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer)
            return res
                .status(404)
                .send('The customer with the given ID was not found.');

        res.send(customer);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer)
            return res
                .status(404)
                .send('The customer with the given ID was not found.');
        res.send(customer);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

function validateCustomer(customer) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required(),
        isGold: Joi.boolean().required(),
        number: Joi.string()
            .optional()
            .min(10)
            .max(15)
    };
    return Joi.validate(customer, schema);
}

module.exports = router;
