const Joi = require('joi');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            isGold: { type: Boolean, default: false },
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 255
            },
            phone: {
                type: String,
                required: false,
                minlength: 10,
                maxlength: 15
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                trim: true,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            genre: { type: genreSchema, required: true },
            numberInStock: {
                type: Number,
                required: true,
                min: 0,
                max: 10000,
                default: 0
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 10000,
                default: 0
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
        required: false
    },
    rentalFee: {
        type: Number,
        required: false,
        min: 0
    }
});
const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;
module.exports.validate = validateRental;
