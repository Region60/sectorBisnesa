let express = require("express")
let router = express.Router()
let { PrismaClient } = require("@prisma/client")

let prisma = new PrismaClient()

router.get("/", async (req, res) => {
  try {
    let users = await prisma.user.findMany({
      skip: req.query.page * req.query.quantity - req.query.quantity,
      take: +req.query.quantity,
      orderBy: {
        registerdate: "asc",
      },
    })
    return res.status(200).json({
      users,
    })
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
