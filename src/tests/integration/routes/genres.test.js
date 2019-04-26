const request = require('supertest');
const { Genre } = require('../../../models/genre');
const mongoose = require('mongoose');
const { User } = require('../../../models/user');
let server;

describe('api/genres', () => {
  beforeEach(() => {
    server = require('../../../index');
  });

  afterEach(async () => {
    await Genre.remove({});
    server.close();
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.insertMany([{ name: 'genre1' }, { name: 'genre2' }]);
      const res = await request(server).get('/api/genres/');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return the genre for the given id', async () => {
      const payload = {
        _id: mongoose.Types.ObjectId().toHexString(),
        name: 'genre1'
      };
      await Genre.insertMany([payload, { name: 'genre2' }]);

      const res = await request(server).get(`/api/genres/${payload._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(payload);
    });

    it('should return 404 for invalid mongo ids', async () => {
      const invalid = mongoose.Types.ObjectId().toHexString();
      const res = await request(server).get(`/api/genres/${invalid}`);

      expect(res.status).toBe(404);
    });

    it('should return 404 for invalid mongo ids', async () => {
      const res = await request(server).get(`/api/genres/1`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;
    let exec = () => {
      return request(server)
        .post('/api/genres/')
        .set('x-auth-token', token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User({ isAdmin: true }).generateAuthToken();
      name = 'genre1';
    });

    it('should return 401 if genre is user is not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 3 characters', async () => {
      name = '1234';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      name = Array(52).join('a');
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the genre if the input is valid', async () => {
      const res = await exec();
      const genre = await Genre.findOne({ name: 'genre1' });

      expect(res.status).toBe(200);
      expect(genre).not.toBeNull();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
      expect(res.body._id).toEqual(genre._id.toHexString());
    });
  });
});
