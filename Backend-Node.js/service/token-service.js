const jwt=require('jsonwebtoken')
const tokenModel=require('../models/token-model');
class TokenService{
    generateTokens(payload){
        const accessToken=jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15d'})
        const refreshToken=jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        
        return {
            accessToken,
            refreshToken
        }

    }
    validateAccessToken(token){
        try {
            const userData=jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            console.log("ошибка при валидации access токена")
            return null
        }
    }
    validateRefreshToken(token){
        try {
            const userData=jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            
            return userData
        } catch (error) {
            console.log("ошибка при валидации refresh токена", error)
            return null
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData=await tokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken=refreshToken;
            return tokenData.save()
        }
        const token=await tokenModel.create({user:userId, refreshToken})
        const allTokens=tokenModel.find()
        const ourToken=tokenModel.findOne({refreshToken})
        console.log('пытаемся понять есть ли refresh token после сохранения в базу данных: наш токен: ', ourToken)
        console.log("а теперь все токены: ", allTokens)
        return token;
    }
    async removeToken(refreshToken){
        const tokenData=await tokenModel.deleteOne({refreshToken})
        return tokenData;

    }
    async findToken(refreshToken){
        const tokenData=await tokenModel.findOne({refreshToken})
        const allTokens=await tokenModel.find()
        
        if(!tokenData){
            console.log('не нашли refrseh токен в базе данных')
            console.log('наш refresh токен: ', refreshToken, "refresh токен в базе данных:", allTokens )
        }
        return tokenData;

    }

}
module.exports=new TokenService()