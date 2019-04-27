const request = require('supertest');
const { Genre } = require('../../../models/genre');
const mongoose = require('mongoose');
const { User } = require('../../../models/user');
let server;

describe('auth middleware', () => {
  beforeEach(() => {
    server = require('../../../index');
    token = new User({ isAdmin: false }).generateAuthToken();
  });

  afterEach(async () => {
    await Genre.deleteMany({});
    await server.close();
  });
  let token;
  let exec = () => {
    return request(server)
      .post('/api/genres/')
      .set('x-auth-token', token)
      .send({ name: 'genre-auth' });
  };
  beforeEach(() => {});

  it('should return 401 if no token is provided', async () => {
    token = '';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return a 400 if token is invalid', async () => {
    token = 'a';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return a 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
