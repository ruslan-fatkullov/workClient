const db = require("../models")
const Help = db.help

exports.GetAllMessage = (req, res) => {
    Help.findAll().then(function (helpMessage) {
        res.json({ helpList: helpMessage })
    }).catch(err => {
        console.log("Ошибка в получении списка сообщений" + err)
    })
}

exports.CreateHelpMessage = (req, res) => {
    Help.create(
        {
            email: req.body.email,
            fullName: req.body.fullName,
            message: req.body.message
        }

    ).then(function () {
        res.json({ message: "Сообщение отправлено в техническую поддержку" })
    }).catch(err => {
        console.log("Ошибка в отправке сообщения" + err)
    })
}