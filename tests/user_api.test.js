const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')


const api = supertest(app)

const initialUsers = [
  {
    username: 'tonytran',
    name: 'Tony Tran',
    passwordHash: ''
  },
]

// TODO: create test case
describe("create invalid users", () => {
  test("invalid username", async () => {
    const res = await api.post('/api/users').send({
      username: 'ab',
      name: 'ABC DS',
      password: '123@'
    }).expect(400);
    expect(res.body.error).toMatch(/username and password/i)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})