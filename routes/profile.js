const express = require("express")
const router = express.Router()
const multer = require("multer")
const auth = require("../middleware/auth")
const validator = require("../middleware/validator/validator")
const user = require("../public/javascripts/user/userServices")
const { getUser } = require("../public/javascripts/user/userServices")


function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, req.params.id + "_" + file.originalname)
  },
})
const multerSettings = { storage, fileFilter, limits: { fieldSize: 8e7 } }

router.put("/:id", auth, validator, async (req, res) => {
  try {
    const response = await user.editUserData(+req.params.id, req.body)
    return res.status(response.code).send(response.message)
  } catch (e) {
    console.log(e)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const response = await getUser(+req.params.id)
    return response.candidate
      ? res.status(response.code).json(response.candidate)
      : res.status(response.code).send(response.message)
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
      const response = await user.updatePhoto(+req.params.id, req.file.path)
      return res.status(response.code).send(response.message)
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router
