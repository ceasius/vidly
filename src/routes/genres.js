const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', auth, async (req, res) => {
  try {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
      name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send('Invalid Params Id');

    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send('The genre with the given ID was not found.');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.set({
      name: req.body.name
    });
    await genre.save();

    res.send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send('Invalid Params Id');

    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send('Invalid Params Id');

    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre)
      return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
