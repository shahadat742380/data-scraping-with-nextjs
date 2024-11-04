import request from 'supertest';
import { baseUrl } from './config';

describe('Register API', () => {
  test('Should register a new user and return 201', async () => {
    const newUser = {
      user_name: 'testuser',
      email: 'test@example.com',
      phone_number: '1234567890',
    };

    const res = await request(baseUrl).post('/api/register').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      success: true,
      message: 'User registered successfully',
    });
  });

  test('Should return 409 if user already exists', async () => {
    const existingUser = {
      user_name: 'existinguser',
      email: 'existing@example.com',
      phone_number: '0987654321',
    };

    // First request to create the user
    await request(baseUrl).post('/api/register').send(existingUser);

    // Second request should trigger conflict
    const res = await request(baseUrl).post('/api/register').send(existingUser);
    expect(res.status).toBe(409);
    expect(res.body).toEqual({
      success: false,
      message: 'User already registered',
    });
  });

  test('Should return 400 for invalid input', async () => {
    const invalidUser = {
      user_name: 'us', // too short (less than 3 characters)
      email: 'invalid-email', // invalid email format
      phone_number: '123', // too short (less than 10 characters)
    };

    const res = await request(baseUrl).post('/api/register').send(invalidUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toHaveProperty('issues');

    // Check specific validation messages
    expect(res.body.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['user_name'],
          message: 'String must contain at least 3 character(s)',
        }),
        expect.objectContaining({
          path: ['email'],
          message: 'Invalid email',
        }),
        expect.objectContaining({
          path: ['phone_number'],
          message: 'String must contain at least 10 character(s)',
        }),
      ])
    );
  });
});
