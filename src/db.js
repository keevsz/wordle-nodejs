const mongoose = require("mongoose")
const { URI } = require("./config")

const database = mongoose
  .connect(URI)
  .then((m) => {
    console.log("Conectado")
    return m.connection.getClient()
  })
  .catch((e) => console.log("Falló la conexión: " + e))

module.exports = database
