const {Router} = require('express');

const {carController} = require('../controllers');
const {commonMiddleware,carMiddleware, userMiddleware} = require('../middlewares');

const carRouter = Router();

carRouter.post(
    '/',
    commonMiddleware.checkIfIdValid('userId', 'query'),
    carMiddleware.checkIfBodyValid,
    userMiddleware.isUserPresent('query'),
    carController.createCar
);
carRouter.get(
    '/:carId',
    commonMiddleware.checkIfIdValid('carId'),
    carMiddleware.checkIfCarPresent,
    carController.getCarById
);
carRouter.put(
    '/:carId',
    commonMiddleware.checkIfIdValid('carId'),
    carMiddleware.checkIfCarPresent,
    carController.updateCarById
);
carRouter.delete(
    '/:carId',
    commonMiddleware.checkIfIdValid('carId'),
    carMiddleware.checkIfCarPresent,
    carController.deleteCarById
);

module.exports = carRouter;