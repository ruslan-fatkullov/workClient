const express = require("express");

const router = express.Router()

const helpController = require("../controller/help.Controller");

// получение списка всех сообщений
router.get("/getAllHelpMessage", helpController.GetAllMessage)

// получение списка всех сообщений
router.post("/sendHelpMessage", helpController.CreateHelpMessage)

module.exports = router;