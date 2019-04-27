const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
  it('should populate req.user with a valid JWT', () => {
    payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    const token = new User(payload).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {
      status: jest.fn().mockReturnValue(this),
      send: jest.fn().mockReturnValue(this)
    };
    const next = jest.fn();
    auth(req, res, next);

    expect(req.user).toMatchObject(payload);
  });
});
