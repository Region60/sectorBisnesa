const jwt = require("jsonwebtoken")
const key = require("../../../key/index")

function generateToken(user) {
  const u = {
    name: user.name,
    email: user.email,
    _id: user._id,
  }
  return (token = jwt.sign(u, key.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  }))
}

module.exports = generateToken
