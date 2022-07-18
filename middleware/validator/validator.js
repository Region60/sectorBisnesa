const vl = require("validator")
const validatorsMethods = require("./validatorMethods")

function validator(req, res, next) {
  if (req.body.email && req.body.password) {
    const response = validatorsMethods.emailPassword(req.body.email, req.body.password)
    if(response) {
      res.status(400).send(response)
    }
    next()
  }
  if(req.body.sex){
    const response = validatorsMethods.sex(req.body.sex)
    if(response) {
      res.status(400).send(response)
    }
    next()
  }
}

module.exports = validator
