const Router =require('express')
const CRUDController =require('../CRUD/Controller.js')
const authMiddleware=require('../middlewares/auth-middleware')

const routerCrud=new Router()

routerCrud.post('/newProduct', CRUDController.create)
routerCrud.get('/product/:id', CRUDController.getOne)
routerCrud.put('/editProduct', CRUDController.update)
routerCrud.delete('/deleteProduct/:id', CRUDController.delete)
routerCrud.get('/getAllProducts', authMiddleware, CRUDController.getAll)





module.exports=routerCrud