const BasketService = require("../service/basket-service");
class BasketController {
  async addProduct(req, res, next) {
    try {
      const { userId, productId, amount } = req.body;
      console.log("Полученные данные:", { userId, productId, amount });

      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res
          .status(400)
          .json({ message: "Некорректное количество товара" });
      }

      const basket = await BasketService.addInBasket(
        userId,
        productId,
        parsedAmount
      );
      return res.json(basket);
    } catch (error) {
      console.log("ошибка при добавлении товара в корзину: ", error);
      next(error);
    }
  }
  async DeleteProduct(req, res, next) {
    try {
      const { userId, productId } = req.body;
      const basket = await BasketService.removeFromBasket(userId, productId);
      return res.json(basket);
    } catch (error) {
      console.log("ошибка при удалении товара из корзины: ", error);
      next(error);
    }
  }
  async removeOneFromBasket(req, res, next) {
    try {
      const { userId, pId } = req.body;
      const product = await BasketService.removeOneFromBasket(
        userId,
        pId
      );
      return res.json(product);
    } catch (error) {
      console.log("ошибка при уменшьении количества товара: ", error);
      next(error);
    }
  }
  async purchaseBasket(req, res, next) {
    try {
      const { userId } = req.body;
      const inventar = await BasketService.purchaseBasket(userId);
      return res.json(inventar);
    } catch (error) {
      console.log("ошибка при удалении товара из корзины: ", error);
      next(error);
    }
  }
  async getAllProductsInBasket(req, res, next) {
    try {
      const { userId } = req.query;
      const allProducts = await BasketService.getAllProductsInBasket(userId);
      return res.json(allProducts);
    } catch (error) {
      console.log("ошибка при получении всех товаров в корзине: ", error);
      next(error);
    }
  }
  async getAllProductsInInventar(req, res, next) {
    try {
      const { userId } = req.query;
      console.log('id пользователя перед отпрвкой в инвентраь: ', userId)
      const allProducts = await BasketService.getAllProductsInInventar(userId);
      return res.json(allProducts);
    } catch (error) {
      console.log("ошибка при получении всех товаров в инвентаре: ", error);
      next(error);
    }
  }
}

module.exports = new BasketController();
