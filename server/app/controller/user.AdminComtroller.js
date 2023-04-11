const db = require("../models")
const User = db.user
exports.GetAllUser = (req, res) => {
    User.findAll().then(function (user) {
        res.json({ users: user })
    }).catch(err => {
        console.log("Ошибка в получении пользователей" + err)
    })
}

exports.DeleteUserById = (req, res) => {
    User.destroy({
        where: {
            id: req.query.id
        }
    }).then(function () {
        res.json({ message: "Пользователь удален" })
    }).catch(err => {
        console.log("Ошибка при удалении" + err)
    })
}

exports.UpdateUserById = (req, res) => {
    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        active: req.body.active,
    }, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.json({ message: "Пользователь обновлен" })
    }).catch(err => {
        console.log("Ошибка при обновлении" + err)
    })
}