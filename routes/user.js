let express = require("express")
let router = express.Router()
let bcrypt = require("bcryptjs")
let generateToken = require("../public/javascripts/jwtToken")
let validator = require("../middleware/validator")

let { PrismaClient } = require("@prisma/client")

let prisma = new PrismaClient()

router.post("/register", validator, async (req, res) => {
  try {
    let { name, email, password } = req.body
    let candidate = await prisma.user.findUnique({ where: { email } })
    if (candidate) {
      console.log("Пользователь найден:" + candidate)
      res.send("Пользователь с таким email уже существует")
    } else {
      let hashPassword = await bcrypt.hash(password, 10)
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      })
      console.log("Пользователь создан:")
      res.send("Пользователь создан")
    }
  } catch (e) {
    console.log(e)
  }
})

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body
    let candidate = await prisma.user.findUnique({ where: { email } })
    if (!candidate) {
      return res.status(404).json({
        error: true,
        message: "Неправильный email или пароль",
      })
    }
    bcrypt.compare(password, candidate.password).then(function (valid) {
      if (valid) {
        let token = generateToken(candidate)
        return res.status(200).json({
          token,
        })
      }
      return res.status(404).json({
        error: true,
        message: "Неправильный email или пароль",
      })
    })
  } catch (e) {
    console.log(e)
  }
})

router.put("")
module.exports = router
