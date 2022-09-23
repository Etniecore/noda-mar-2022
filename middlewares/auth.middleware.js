const {ApiError} = require("../errors");
const {statusCodes,constants,tokenType} = require("../constants");
const {tokenService, authService} = require("../services");

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);// retrieve token from header
            if (!access_token) {// check if token was linked to header
                return next(new ApiError('Token was not found', statusCodes.UNAUTHORIZED));
            }
            tokenService.verifyToken(access_token, tokenType.ACCESS);// verifying the token by type of the token(access/refresh)

            const tokenInfo = await authService.getTokenWithUser({access_token});
            console.log(tokenInfo);// gets all info about this token from DB (user info included)

            if (!tokenInfo) {//checks if token is valid
                return next(new ApiError('Token is not valid', statusCodes.UNAUTHORIZED))
            }
            req.tokenInfo = tokenInfo;
            next()
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION)
            if (!refresh_token) {
                return next(new ApiError('Token was not found', statusCodes.UNAUTHORIZED))
            }
            tokenService.verifyToken(refresh_token, tokenType.REFRESH);

            const tokenInfo = await authService.getOneByParams({refresh_token});
            if (!tokenInfo) {
                return next(new ApiError('Token is not valid', statusCodes.UNAUTHORIZED));
            }
            req.tokenInfo = tokenInfo;
            next()
        } catch (e) {
            next(e)
        }
    }
}