const UserModel = require("../models/user-model");
const ProductModel = require('../models/Product-model'); 
const fs = require("fs");
const { join } = require("path");
const UserDto = require("../dtos/user-dto");

class BasketService {
    async addInBasket(userId, productId, amount) {
        const user = await UserModel.findById(userId);
        const product = await ProductModel.findById(productId);
        

        if (!product) {
            throw new Error('Продукт не найден');
        }
        const existingProduct = user.basket.find(item => item.productId.toString() === product.id);
        if (existingProduct && existingProduct.quantity>0  && existingProduct.amount>0) {
            console.log('товар, который уже есть в корзине: ', existingProduct)
            existingProduct.amount += 1;
            existingProduct.quantity -= 1;
        } else if(!existingProduct) {
            user.basket.push({
                productId: product.id,
                amount: amount || 1,
                quantity: product.quantity,
                price: product.price,
                name: product.name,
                description: product.description,
                uniqueness: product.uniqueness,
                category: product.category,
                picture: product.picture
            });
        }

        await user.save();
        return user.basket;
    }

    async removeFromBasket(userId, productId) {
        const user = await UserModel.findById(userId);
        user.basket = user.basket.filter(product => product.productId.toString() !== productId);
        await user.save();
        return user.basket;
    }
    async removeOneFromBasket(userId, pId) {
        const user = await UserModel.findById(userId);
        const product = user.basket.find(product => product.productId.toString() === pId);
        if(!product){
            console.log('не нашли продукт')
        }
        if (product.amount > 1) {
            product.amount -= 1; 
            product.quantity+=1;
        } else{ console.log('операция не может быть выполнена')}
        console.log('amount: ',product.amount, 'quantity: ', product.quantity)
        await user.save();
        return product
    }

    async purchaseBasket(userId) { 
        const user = await UserModel.findById(userId).populate('basket.productId'); // Загрузка продукта вместе с пользователем
        const totalAmount = user.basket.reduce((total, item) => total + item.price * item.amount, 0);
    
        if (totalAmount <= user.balance) {
            user.balance -= totalAmount;
    
            const inventarItems = user.basket.map(item => ({
                productId: item.productId._id, // ID продукта
                quantity: item.amount, // Количество из корзины
                price: item.productId.price, // Цена из продукта
                name: item.productId.name, // Название из продукта
                description: item.productId.description, // Описание из продукта
                uniqueness: item.productId.uniqueness, // Уникальность из продукта
                category: item.productId.category, // Категория из продукта
                picture: item.productId.picture // Изображение из продукта 
            }));
    
            for (const newItem of inventarItems) {
                // Проверяем, существует ли товар уже в инвентаре
                const existingItem = user.inventar.find(item => item.productId.equals(newItem.productId));
    
                // Если товара нет в инвентаре, добавляем его
                if (!existingItem) {
                    user.inventar.push(newItem);
                }
                // Если товар уже есть, ничего не делаем
            }
    
            user.basket = []; 
            const DUser=new UserDto(user)
            await user.save();
            return DUser; 
        } else {
            throw new Error("Недостаточно средств для покупки");
        }
    }
    async getAllProductsInBasket(userId){
        const user=await UserModel.findById(userId);
        const allProducts=user.basket
        const response = await Promise.all(
                allProducts.map(async (product) => {
                  const imagePath = join(__dirname, "static", product.picture);
                  console.log(`Looking for image at: ${imagePath}`);
                  const exists = fs.existsSync(imagePath);
                  console.log(`Image exists for product ${product.name}: ${exists}`);
        
                  const imageBase64 = exists
                    ? `data:image/jpeg;base64,${Buffer.from(
                        fs.readFileSync(imagePath)
                      ).toString("base64")}`
                    : "" ||
                      console.warn(`Image not found for product: ${product.name}`);
        
                  return {
                    productId: product.productId,
                    amount: product.amount,
                    quantity: product.quantity,
                    price: product.price,
                    name: product.name,
                    description: product.description,
                    quantity: product.quantity,
                    uniqueness: product.uniqueness,
                    category: product.category,
                    picture: imageBase64,
                  };
                })
              );
        return response

    }
    async getAllProductsInInventar(userId){
        const user=await UserModel.findById(userId);
        console.log('пользователь: ', user, 'инвентарь пользователя: ', user.inventar)
        const allProducts=user.inventar
        const response = await Promise.all(
                allProducts.map(async (product) => {
                  const imagePath = join(__dirname, "static", product.picture);
                  console.log(`Looking for image at: ${imagePath}`);
                  const exists = fs.existsSync(imagePath);
                  console.log(`Image exists for product ${product.name}: ${exists}`);
        
                  const imageBase64 = exists
                    ? `data:image/jpeg;base64,${Buffer.from(
                        fs.readFileSync(imagePath)
                      ).toString("base64")}`
                    : "" ||
                      console.warn(`Image not found for product: ${product.name}`);
        
                  return {
                    productId: product.productId,
                    quantity: product.quantity,
                    price: product.price,
                    name: product.name,
                    description: product.description,
                    uniqueness: product.uniqueness,
                    category: product.category,
                    picture: imageBase64,
                  };
                })
              );
              console.log('инвентарь: ', response)
        return response

    }
}

module.exports = new BasketService();