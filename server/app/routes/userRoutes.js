const express = require("express");

const router = express.Router()

const SignInController = require("../controller/user.RegisterController.js");
const LoginController = require("../controller/user.LoginController.js");
const userController = require("../controller/user.userController.js");


// регистрация нового пользователя
router.get("/getUserByEmail", userController.getUserByEmail);

// смена пароля
router.post("/changePassword", LoginController.changePassword);

// регистрация нового пользователя
router.post("/signUp", SignInController.signUp);

// авторизация пользователя
router.post("/login", LoginController.LogIn);

// подтверждение аккаунта
router.get("/emailConfirm", LoginController.EmailConfirm);

// оптравка ссылки на форму замены пароля
router.post("/changePassToEmail", LoginController.ChangePasswordSendToEmail)

// отправка ссылки на подтверждение пароля
router.post("/sendLinkToMail", LoginController.EmailConfirmSendMessage)

module.exports = router;