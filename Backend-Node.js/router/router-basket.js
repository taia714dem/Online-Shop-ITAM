const Router =require('express')
const BasketController =require('../controllers/basket-controller.js')
const routerBasket=new Router()

routerBasket.post('/addProduct', BasketController.addProduct); 
routerBasket.put('/deleteProduct', BasketController.DeleteProduct);
routerBasket.post('/purchase', BasketController.purchaseBasket);
routerBasket.get('/getAllProductsInBasket', BasketController.getAllProductsInBasket)
routerBasket.get('/getAllProductsInInventar', BasketController.getAllProductsInInventar)
routerBasket.put('/deleteOne', BasketController.removeOneFromBasket)
module.exports=routerBasket