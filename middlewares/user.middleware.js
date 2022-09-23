const {ApiError} = require('../errors');
const {userService} = require('../services')
const {statusCodes} = require('../constants')
const  userValidator = require('../validators/user.validator')

module.exports = {
    bodyValid: async (req, res, next) => {
        try {
            const validate =  userValidator.validate(req.body);
            if(validate.error){
                return next(new ApiError(validate.error.message), statusCodes.BAD_REQUEST)
            }
            req.body = validate.value;
            next();
        } catch (e) {
            next(e)
        }
    },

    checkIfUserEmailUniq: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;

            const userByEmail = await userService.getOneByParams({email, _id: {$ne: userId}});// find by email and different ID

            if (userByEmail) {// if email and id belongs to 1 user, you can edit it. zavadovskyi.b@gmail.com && _id (7) !==userId(7){throw error}
                return next(new ApiError('Email is already taken', statusCodes.CONFLICT));
            }
            next();
        } catch (e) {
            next(e)
        }
    },

    isUserPresent: (from = 'params') => async (req, res, next) => {
        try {
            const {userId} = req[from];

            const userById = await userService.getOneById(userId);
            if (!userById) {
                return next(new ApiError('User was not found', statusCodes.NOT_FOUND));
            }
            req.user = userById;//link user which was found to request. You already did query to database, so, you can lift this user to next middleware or controller, so, you do not need to send query to database one more time.
            next();
        } catch (e) {
            next(e)
        }
    },
    getUserDynamically: (from = 'body', fieldName, dbField) => async (req, res, next) => {
        try {
            const field = req[from][fieldName];//req.body.email
            const user = await userService.getOneByParams({[dbField]: field});//{email: zavadovskyi.b@gmail.com}
            if (!user) {
                return next(new ApiError('User was not found', statusCodes.NOT_FOUND));
            }
            req.user = user;
            next()
        } catch (e) {
            next(e)
        }
    }
}