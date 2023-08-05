const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const testUser = require('../middleware/testUser')
const { register, login, updateUser } = require('../controllers/auth')

//to limit login attempts
const rateLimit = require('express-rate-limit')
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests,
  message: {
    msg: 'Too many requests from this IP, please try again in an hour!',
  },
})

router.post('/register', apiLimiter, register)
router.post('/login', apiLimiter, login)
router.patch('/updateUser', authenticateUser, testUser, updateUser)

module.exports = router
