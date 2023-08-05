const { BadRequestError } = require('../errors')

const testUser = async (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError(
      'You cannot perform this action - Test User is ReadOnly!'
    )
  }
  next()
}

module.exports = testUser
