const express = require('express');
const { Rental, validate } = require('../models/rental');
const validateJoi = require('../middleware/validate');
const { Movie } = require('../models/movie');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', [auth, validateJoi(validate)], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  if (!rental) return res.status(404).send('Rental not found.');
  if (rental.dateReturned)
    return res.status(400).send('Rental already returned.');

  await Movie.updateOne(
    { _id: req.body.movieId },
    { $inc: { numberInStock: 1 } }
  );
  rental.returnRental();
  await rental.save();

  return res.send(rental);
});

module.exports = router;
