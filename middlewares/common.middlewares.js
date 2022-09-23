const { isObjectIdOrHexString } = require('mongoose');
const {statusCodes}= require('../constants')

const {ApiError} = require("../errors");

module.exports = {
    checkIfIdValid:(fieldName, from='params')=> async (req,res,next)=> {
        try {
            if(!isObjectIdOrHexString(req[from][fieldName])){//req.params.userId
                return next(new ApiError('ID is not valid', statusCodes.BAD_REQUEST))
            }
            next()
        }catch (e) {
            next(e)
        }
    }
}