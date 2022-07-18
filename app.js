const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const helmet = require("helmet")



const profileRouter = require("./routes/profile")
const profilesRouter = require("./routes/profiles")
const userRouter = require("./routes/user")

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(helmet())

app.use("/profile", profileRouter)
app.use("/profiles", profilesRouter)
app.use("/user", userRouter)

module.exports = app
