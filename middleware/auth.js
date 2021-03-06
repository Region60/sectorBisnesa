const key = require("../key/index")
const jwt = require("jsonwebtoken")

function auth(req, res, next) {
  try {
    const token = req.headers["authorization"]
    if (!token) {
      return res.send("сначала авторизуйтесь")
    }
    token = token.replace("Bearer ", "")

    jwt.verify(token, key.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "выполните вход",
        })
      } else {
        next()
      }
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = auth
