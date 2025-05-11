const Router = require("express");
const userController = require("../controllers/user-controller");
const routerAuth = new Router();
const { body } = require("express-validator");


routerAuth.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({min: 6, max:32}),
  userController.registration
);
routerAuth.post("/login", userController.login);
routerAuth.get("/updateUser", userController.getUserById);
routerAuth.post("/logout", userController.logout);
routerAuth.get("/activate/:link", userController.activate);
routerAuth.get("/refresh", userController.refresh);

module.exports = routerAuth;
