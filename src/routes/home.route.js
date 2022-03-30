const express = require("express")
const router = express.Router()

const { homeForm, verifyWord } = require("../controllers/homeController")
const verifyUser = require("../middlewares/verifyUser")

router.get("/", verifyUser, homeForm)
router.post("/verify", verifyWord)

module.exports = router
