const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  // validate user
  if (!username || !password) {
    response.status(400).json({error: 'username and password must be not empty'})
    next();
  } else if (username.length < 3 || password.length < 3) {
    response.status(400).json({error: 'username and password must be more than 3 characters'})
    next();
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }

})
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.status(201).json(users)
})

module.exports = usersRouter