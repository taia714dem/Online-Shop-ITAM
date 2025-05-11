const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      const user = await userService.activate(activationLink);
      return res.redirect(`http://localhost:5173`);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(
        "начинаем выполнять функцию refresh в контроллере с refresh токеном: ",
        refreshToken
      );
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.on("finish", () => {
        console.log("Cookie set with value:", userData.refreshToken);
      });

      console.log(
        "refresh токен после обновления в контроллере (то, что сейчас сохранится в куки): ",
        userData.refreshToken
      );

      return res.json(userData);
    } catch (error) {
      console.log("ошибка при refresh в контроллере");
      next(error);
    }
  }
  async getUserById(req, res, next){
    try {
      const {userId}=req.params;
      const user=await userService.getUserById(userId);
      return res.json(user)
      
    } catch (error) {
      next(ApiError.BadRequest(error.message));
    }
  }
}

module.exports = new UserController();
