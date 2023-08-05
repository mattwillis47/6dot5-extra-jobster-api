const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      token,
    },
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      token,
    },
  })
}

const updateUser = async (req, res) => {
  console.log(req.user)
  //console.log(req.body)
  const { name, lastName, location, email } = req.body
  if (!name || !lastName || !location || !email) {
    throw new BadRequestError('Please provide all fields')
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  )
  const token = updatedUser.createJWT()
  res.status(StatusCodes.OK).json({ user: updatedUser, token })
}

module.exports = {
  register,
  login,
  updateUser,
}
