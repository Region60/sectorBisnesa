let express = require("express")
let path = require("path")
let cookieParser = require("cookie-parser")
let logger = require("morgan")
let helmet = require("helmet")



let profileRouter = require("./routes/profile")
let profilesRouter = require("./routes/profiles")
let userRouter = require("./routes/user")

let app = express()

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
