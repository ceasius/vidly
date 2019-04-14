const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255 }
});
const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        res.send(genres);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateGenre(req.body);
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

router.put('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre)
            return res
                .status(404)
                .send('The genre with the given ID was not found.');

        const { error } = validateGenre(req.body);
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

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre)
            return res
                .status(404)
                .send('The genre with the given ID was not found.');

        res.send(genre);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre)
            return res
                .status(404)
                .send('The genre with the given ID was not found.');
        res.send(genre);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;
