const jwt = require('jsonwebtoken');

const {ApiError} = require('../errors');
const {statusCodes,tokenType} = require("../constants");
const {
    ACCESS_SECRET_WORD,
    REFRESH_SECRET_WORD,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_TOKEN_LIFETIME
} = require("../configs/config");

module.exports = {
    createTokens: (payload) => {
        const access_token = jwt.sign(payload, ACCESS_SECRET_WORD, {expiresIn: ACCESS_TOKEN_LIFETIME});
        const refresh_token = jwt.sign(payload, REFRESH_SECRET_WORD, {expiresIn: REFRESH_TOKEN_LIFETIME});
        return {access_token, refresh_token};
    },

    verifyToken: (token, type) => {
        try {
            let word;
            if (type === tokenType.ACCESS) word = ACCESS_SECRET_WORD
            if (type === tokenType.REFRESH) word = REFRESH_SECRET_WORD
            return jwt.verify(token, word);

        } catch (e) {
            throw new ApiError('Token is not valid', statusCodes.UNAUTHORIZED)
        }
    }
}



