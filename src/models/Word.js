const { Schema, model } = require("mongoose")

const wordSchema = {
  word: { type: String, unique: true },
  ide: { type: String, unique: true },
}

module.exports = model("Word", wordSchema)
