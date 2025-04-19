import request from 'supertest';
import { app } from '..';

describe('Auth Controller - /api/auth/login', () => {
  const loginUrl = '/api/auth/login';

  it('responds with 400 if email or password is missing', async () => {
    const res = await request(app)
      .post(loginUrl)
      .send({})
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      'message',
      'Email and Password are mandatory fields.',
    );
  });

  it('responds with 401 when credentials are invalid', async () => {
    const res = await request(app)
      .post(loginUrl)
      .send({ email: 'wrong@example.com', password: 'badpass' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'wrong credentials.');
  });

  it('responds with 200 and returns an id and token for valid credentials', async () => {
    const valid = {
      email: 'tadeo.daga@gmail.com',
      password: '1234',
    };

    const res = await request(app)
      .post(loginUrl)
      .send(valid)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(typeof res.body.id).toBe('string');
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });
});
