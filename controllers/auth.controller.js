const {passwordService,tokenService,authService} = require("../services");
const {statusCodes} = require("../constants");

module.exports = {
    login: async (req,res,next)=>{
        try{
            const { password } = req.body;// password from form field
            const { password:hashedPassword, _id} = req.user;// takes password from DB

            await passwordService.comparePasswords(password,hashedPassword); //compare password with the password from DB
            const tokens = tokenService.createTokens({_id});// creating tokens

            await authService.saveTokens({...tokens,user: _id});// saving both tokens to DB and links it to user

            res.json({...tokens, user:req.user})//

            next()
        }catch (e){
            next(e);
        }
    },
    refresh: async(req,res,next)=>{
        try{
            const {user, refresh_token} = req.tokenInfo;// get refresh token from header and user`s ID as 'user'

            await authService.deleteByParams({refresh_token});// removes previous tokens from DB

            const tokens = tokenService.createTokens({_id:user});//creates a new pair of tokens

            const newTokens = await authService.saveTokens({...tokens,user:user});// saves new token to DB and links to user
            res.json(newTokens);
        }catch (e) {
            next(e)
        }
    },
    logout: async (req,res,next) =>{
        try {
            const {user, access_token} = req.tokenInfo;//retrieve access token and user
            console.log(user);
            await authService.deleteByParams({user: user._id, access_token});// delete old tokens
            res.sendStatus(statusCodes.NO_CONTENT)
        }catch (e) {
            next(e)
        }
    }
}