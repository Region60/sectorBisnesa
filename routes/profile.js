let express = require("express")
let router = express.Router()
let multer = require("multer")
let { PrismaClient } = require("@prisma/client")
let auth = require("../middleware/auth")

let prisma = new PrismaClient()

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, req.params.id + "_" + file.originalname)
  },
})
let multerSettings = { storage, fileFilter, limits: { fieldSize: 8e7 } }

router.put("/:id", auth, async (req, res) => {
  try {
    let id = +req.params.id
    let { name, lastname, sex, photo } = req.body
    let candidate = await prisma.user.findUnique({ where: { id } })
    if (!candidate) {
      return res.status(404).json({
        error: true,
        message: "Такого пользователя не существует",
      })
    }
     await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        lastname,
        sex,
        photo,
      },
    })

    return res.status(200).send("Информация успешно обновлена")
  } catch (e) {
    console.log(e)
  }
})

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params)
    let id = +req.params.id
    console.log(typeof id)
    let { password, ...candidate } = await prisma.user.findUnique({
      where: { id },
    })
    if (!candidate) {
      return res.status(404).json({
        error: true,
        message: "Такого пользователя не существует",
      })
    }
    return res.status(200).json({
      candidate,
    })
  } catch (e) {
    console.log(e)
  }
})

router.post(
  "/loadimage/:id",
  auth,
  multer(multerSettings).single("image_save"),
  async (req, res) => {
    try {
      let id = +req.params.id
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          photo: req.file.path,
        },
      })
      return res.status(200).send("фото добавлено")
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router
