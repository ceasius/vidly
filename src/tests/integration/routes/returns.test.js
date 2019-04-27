//POST /api/returns {customerId, movieId}

//
//
//
//
//
//

const request = require('supertest');
const { Rental } = require('../../../models/rental');
const { Movie } = require('../../../models/movie');
const mongoose = require('mongoose');
const { User } = require('../../../models/user');
const moment = require('moment');
let server;

describe('api/genres', () => {
  beforeEach(async () => {
    server = require('../../../index');
  });

  afterEach(async () => {
    await Rental.deleteMany({});
    await Movie.deleteMany({});
    await server.close();
  });

  describe('POST /', () => {
    let post;
    let token;
    let rentalId;
    let rental;
    let movie;
    beforeEach(async () => {
      token = new User().generateAuthToken();
      post = {
        customerId: mongoose.Types.ObjectId().toHexString(),
        movieId: mongoose.Types.ObjectId().toHexString()
      };
      let data = {
        customer: {
          _id: post.customerId,
          name: 'name',
          phone: '000000000000000'
        },
        movie: {
          _id: post.movieId,
          title: 'title',
          dailyRentalRate: 2
        }
      };
      movie = new Movie({
        _id: post.movieId,
        title: 'title',
        dailyRentalRate: 2,
        genre: { name: '12345' },
        numberInStock: 10
      });
      await movie.save();
      rental = new Rental(data);
      await rental.save();
      rentalId = rental._id;
    });
    let exec = () => {
      return request(server)
        .post('/api/returns/')
        .set('x-auth-token', token)
        .send(post);
    };

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if customerId not provided', async () => {
      post.customerId = '';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if movieId not provided', async () => {
      post.movieId = '';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if rental is not found for customer & movie', async () => {
      await Rental.deleteMany({});
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 400 if rental is already processed', async () => {
      await Rental.updateMany(
        {},
        {
          $set: {
            dateReturned: Date()
          }
        }
      );
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 200 if valid request', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should set the return date', async () => {
      await exec();
      const lookup = await Rental.findById(rentalId);

      const diff = new Date() - lookup.dateReturned;
      expect(lookup.dateReturned).toBeDefined();
      expect(diff).toBeLessThan(10 * 1000);
    });

    it('should calculate the rental fee if input is valid', async () => {
      rental.dateOut = moment().add(-7, 'days');
      await rental.save();
      await exec();
      const lookup = await Rental.findById(rentalId);

      expect(lookup.rentalFee).toBe(14);
    });

    it('should increase the movie stock', async () => {
      await exec();
      const lookup = await Movie.findById(movie._id);

      expect(lookup.numberInStock).toBe(movie.numberInStock + 1);
    });

    it('should return the rental in the body of the response', async () => {
      const res = await exec();
      const lookup = await Rental.findById(rentalId);

      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining([
          'dateOut',
          'dateReturned',
          'rentalFee',
          'customer',
          'movie'
        ])
      );
    });
  });
});
