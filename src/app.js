const express = require("express")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
var cookieParser = require("cookie-parser")

const { URI } = require("./config")

const exphbs = require("express-handlebars")
const path = require("path")
const User = require("./models/User")

const app = express()
app.set("trust proxy", 1)

app.use(
  session({
    secret: "hola",
    name: "kvs-wordle",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: URI,
    }),
  })
)

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) =>
  done(null, { id: user._id, userName: user.userName })
)
passport.deserializeUser(async (user, done) => {
  const userdb = await User.findById(user.id)
  return done(null, { id: userdb._id, userName: userdb.userName })
})

app.set("views", path.join(__dirname, "views"))
app.engine(
  ".hbs",
  exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
)
app.set("view engine", ".hbs")

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

//Global variables
app.use(cookieParser())

app.use(function (req, res, next) {
  res.locals = {
    errors: null,
  }
  next()
})

app.use(require("./routes/auth.route"))
app.use(require("./routes/home.route"))

module.exports = app
