const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('Should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        mobileNumber: '1234567890',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.user.name).toBe('Test User');
    expect(response.body.token).toBeTruthy();
  });

  test('Should login existing user', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      mobileNumber: '1234567890',
      password: 'password123'
    });
    await user.save();

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });
});