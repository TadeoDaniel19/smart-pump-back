// src/controllers/userController.test.ts
import request from 'supertest'
import { app } from '../index'

describe('User Controller – /api/users (protected)', () => {
  const baseUrl = '/api/users'
  let token: string
  let createdId: string

  // 1) Before all tests, log in and grab a valid JWT
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'tadeo.daga@gmail.com',
        password: '1234'
      })
      .set('Content-Type', 'application/json')

    expect(res.status).toBe(200)
    token = res.body.token
    expect(typeof token).toBe('string')
  })

  it('GET  /api/users -  should return 200 and an array', async () => {
    const res = await request(app)
      .get(baseUrl)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    if (res.body.length > 0) {
      createdId = res.body[0]._id
    }
  })

  it('GET  /api/users/:id -  should return 200 and the user when it exists', async () => {
    const res = await request(app)
      .get(`${baseUrl}/${createdId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id', createdId)
    expect(res.body).toHaveProperty('email')
  })

  it('GET  /api/users/:id -  should return 404 when user does not exist', async () => {
    const res = await request(app)
      .get(`${baseUrl}/000000000000000000000000`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message', 'user not found.')
  })

  it('POST /api/users -  should create a user and return 201', async () => {
    const newUser = {
      name: { first: 'Test', last: 'User' },
      email: 'test.user@example.com',
      password: 'pass123',
      guid: 'test-guid',
      isActive: true,
      balance: '$0.00',
      picture: '',
      age: 30,
      eyeColor: 'brown',
      phone: '1234567890',
      address: '123 Test Ave'
    }
    const res = await request(app)
      .post(baseUrl)
      .send(newUser)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    })
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('guid')
    createdId = res.body._id
  })

  it('PUT  /api/users/:id -  should update an existing user and return 200', async () => {
    const updates = { name: { first: 'Updated', last: 'Name' } }
    const res = await request(app)
      .put(`${baseUrl}/${createdId}`)
      .send(updates)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id', createdId)
    expect(res.body.name).toMatchObject(updates.name)
  })

  it('PUT  /api/users/:id -  should return 404 when updating non-existent user', async () => {
    const res = await request(app)
      .put(`${baseUrl}/000000000000000000000000`)
      .send({ name: { first: 'No', last: 'One' } })
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message', 'user not found.')
  })

  it('DELETE /api/users/:id -  should delete an existing user and return 204', async () => {
    const res = await request(app)
      .delete(`${baseUrl}/${createdId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(204)
  })

  it('DELETE /api/users/:id -  should return 404 when deleting non-existent user', async () => {
    const res = await request(app)
      .delete(`${baseUrl}/000000000000000000000000`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message', 'user not found.')
  })
})
