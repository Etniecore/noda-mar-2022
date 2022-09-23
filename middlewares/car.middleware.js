const {ApiError} = require('../errors');
const {statusCodes} = require('../constants')
const {carService} = require("../services");


module.exports = {

    checkIfBodyValid: async (req, res, next) => {
        try{
            const {model, year} = req.body;

            if (model.length <= 2) {
                return next(new ApiError('Model name is too short', statusCodes.BAD_REQUEST))
            }
            if (year < 1900) {
                return next(new ApiError('Invalid year entered', statusCodes.BAD_REQUEST))
            }

            next()
        }catch (e) {
            next(e)
        }


    },
    checkIfCarPresent: async (req, res, next) => {
        try {
            const {carId} = req.params;
            const car = await carService.getOneById(carId);
            if(!car){
                return next (new ApiError('Car was not found', statusCodes.NOT_FOUND))
            }
            req.car = car;
            next()
        }catch (e){
            next(e);
        }
    }

}