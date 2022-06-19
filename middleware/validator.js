let vl = require("validator")

function validator(req, res, next) {
  let { email, password, } = req.body
  if (email) {
    if (!vl.isEmail(email)) {
      return res.status(400).send("Не корректный электронный адрес")
    }
  }
  if (password) {
    if (!vl.isStrongPassword(password)) {
      return res.status(400).send("Не корректный пароль")
    }
  }
  next()
}

module.exports = validator
