const User = require("../models/User")

const loginForm = (req, res) => {
  res.render("login")
}

const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) throw new Error("No existe este username")

    if (!(await user.comparePassword(password)))
      throw new Error("Contraseña incorrecta")

    req.login(user, function (error) {
      if (error) {
        throw new Error("Error al iniciar sesión")
      }
      return res.redirect("/")
    })
  } catch (error) {
    console.log(error)
  }
}

const registerForm = (req, res) => {
  res.render("register")
}

const registerUser = async (req, res) => {
  const { username, password } = req.body
  try {
    let user = await User.findOne({ username })

    if (user) throw new Error("Ya existe este usuario")

    user = new User({ username, password })
    await user.save()

    return res.redirect("/login")
  } catch (error) {
    console.log(error)
  }
}

module.exports = { loginForm, loginUser, registerForm, registerUser }
