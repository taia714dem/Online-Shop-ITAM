const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenModel=require("../models/token-model")
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      {
        throw ApiError.BadRequest(
          `Пользователь с почтовым адресом ${email} уже существует`
        );
      }
    }
    let role='user'
    if(email=='taisiidemidowa@yandex.ru'){
        role='admin'
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      balance: 100,
      role
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    console.log("refresh токен при регистрации: ", tokens.refreshToken)
    const refT=await tokenModel.findOne({refreshToken: tokens.refreshToken});
    console.log('refresh token Найден в базе данных: ', refT)
    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    console.log('refresh токен на бекенде: ', refreshToken)
    console.log('refresh токен в начале рефреша в базе данных: ', await tokenModel.findOne({refreshToken}))
    if (!refreshToken) {
      console.log("нет refresh токена");
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      console.log("нет refresh токена из-за базы днных");
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    console.log('токен, который сохраняем в базу данных в конце функции сервиса: ', tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    };
  }
  async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    return new UserDto(user);
  }

}

module.exports = new UserService();
