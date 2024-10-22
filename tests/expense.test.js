const request = require('supertest');
const app = require('../src/app');
const { User, Expense } = require('../src/models/User');
const mongoose = require('mongoose');

let authToken;
let testUser;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  testUser = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    mobileNumber: '1234567890',
    password: 'password123'
  });
  authToken = await testUser.generateAuthToken();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Expense API', () => {
  beforeEach(async () => {
    await Expense.deleteMany({});
  });

  test('Should create new expense with equal split', async () => {
    const response = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        description: 'Dinner',
        amount: 3000,
        splitType: 'EQUAL',
        participants: [
          { userId: testUser._id },
          { userId: mongoose.Types.ObjectId() },
          { userId: mongoose.Types.ObjectId() }
        ]
      });

    expect(response.status).toBe(201);
    expect(response.body.amount).toBe(3000);
    expect(response.body.splitType).toBe('EQUAL');
  });

  test('Should get user expenses', async () => {
    const expense = await Expense.create({
      description: 'Lunch',
      amount: 1000,
      paidBy: testUser._id,
      splitType: 'EQUAL'
    });

    const response = await request(app)
      .get('/api/expenses/user')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].description).toBe('Lunch');
  });
});