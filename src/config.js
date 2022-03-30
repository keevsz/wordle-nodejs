require("dotenv").config()

module.exports = {
  URI: process.env.URI,
  SESSIONSECRET: process.env.SESSIONSECRET,
  DBNAME: process.env.DBNAME,
  MODO: process.env.MODO,
}
