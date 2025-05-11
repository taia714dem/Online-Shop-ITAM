const ApiError=require('../exceptions/api-error')
const tokenService=require('../service/token-service');
module.exports=function(req, res, next){
    try {
        const authorizationHeader=req.headers.authorization
        if(!authorizationHeader){
            console.log('нет хедера у запроса на товары')
            return next(ApiError.UnauthorizedError())
        }
        const accessToken=authorizationHeader.split(' ')[1]
        if(!accessToken){
            console.log('нет access токена в хедере')
            return next(ApiError.UnauthorizedError())
        }
        const userData=tokenService.validateAccessToken(accessToken)
        if(!userData){
            console.log('access токен не провалидировался')
            return next(ApiError.UnauthorizedError())

        }
        req.user=userData;
        next()
        
    } catch (error) {
        console.log('какая-то другая ошибка из auth-middleware', error)
        return next(ApiError.UnauthorizedError())
    }
}