const {statusCodes} = require('../constants')

const {carService, userService} = require ('../services')


module.exports = {

    createCar: async (req,res,next)=>{
        try{
            const {_id, cars} = req.user;
            const car = await carService.createCar({...req.body, user:_id});

            await userService.updateUserById(_id,{cars:[...cars, car._id]} )

            res.status(statusCodes.CREATE).json(car);
        }catch (e) {
            next(e)
        }
    },

    getCarById: async (req,res,next)=>{
        try {
            const {car} = req;

            res.status(statusCodes.OK).json(car);
        }catch (e) {
            next(e)
        }
    },

    updateCarById: async (req,res,next)=>{
        try {
            const {carId} = req.params;
            const car = await carService.updateCarById(carId, req.body);

            res.status(statusCodes.CREATE).json(car);
        }catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req,res,next)=>{
        try{
            const {carId} = req.params;
            await carService.deleteCarById(carId);

            res.status(statusCodes.NO_CONTENT).json('Object was removed successfully')
        }catch (e) {
            next(e)
        }
    },
}