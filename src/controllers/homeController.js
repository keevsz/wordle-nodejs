const User = require("../models/User")
const Word = require("../models/Word")

const obtenerPalabra = async () => {
  const dayWord = await Word.findOne({ ide: "word" })
  return dayWord.word
}

const homeForm = (req, res) => {
  res.render("home")
}

const verifyWord = async (req, res) => {
  const { word } = req.body
  const dayWord = await obtenerPalabra()

  //matriz de correciones - X - P - G
  const errors = []
  for (let i = 0; i < 5; i++) {
    // gtask
    let letterR = word.substring(i, i + 1)
    let letterDB = dayWord.substring(i, i + 1)
    if (letterR === letterDB) {
      errors.push("G")
    } else {
      if (dayWord.includes(letterR)) {
        errors.push("P")
      } else {
        errors.push("X")
      }
    }
  }

  res.cookie("e", errors.join("-")).redirect("/")
  console.log(req.cookies)
}

module.exports = { homeForm, verifyWord }
