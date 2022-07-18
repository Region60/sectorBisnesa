const express = require("express")
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const user = require("../public/javascripts/user/userServices")

const prisma = new PrismaClient()

router.get("/", async (req, res) => {
  try {
    const response = await user.getUsers(+req.query.page, +req.query.quantity)
    return res.status(response.code).json(
      response.users
    )
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
