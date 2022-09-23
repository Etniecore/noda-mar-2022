const Car = require('../dataBase/Car');

module.exports = {
    createCar(car){
        return Car.create(car);
    },

    getOneById(id){
        return Car.findById(id).populate('user');
    },

    getOneByParams(filter){
        return Car.findOne(filter)
    },

    updateCarById(id, obj){
        return Car.updateOne({_id: id}, obj);
    },

    deleteCarById(id){
        return Car.deleteOne(id);
    },
}