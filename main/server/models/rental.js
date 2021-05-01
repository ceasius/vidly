const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

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

rentalSchema.statics.lookup = async function(customerId, movieId) {
  const rentals = await this.find({
    'customer._id': customerId,
    'movie._id': movieId
  })
  .sort({dateReturned: 'asc', dateOut: 'desc' })
  .limit(1);
  return rentals.find(rental => rental);
};

rentalSchema.methods.returnRental = function() {
  this.dateReturned = Date();

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  });
  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;
module.exports.validate = validateRental;
