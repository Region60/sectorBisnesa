const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator/validator")
const auth = require("../public/javascripts/user/authServices")

const user = require("../public/javascripts/user/userServices")

router.post("/register", validator, async (req, res) => {
  try {
    const response = await user.registartion(req.body)
    return res.status(response.code).send(response.message)
  } catch (e) {
    console.log(e)
  }
})

router.post("/login", async (req, res) => {
  try {
    const response = await auth.login(req.body)
    return response.token
      ? res.status(response.code).json({ token })
      : res.status(response.code).send(response.message)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
