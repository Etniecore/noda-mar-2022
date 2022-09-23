const User =  require('../dataBase/User');
// all queries to database should be here!!!
module.exports = {
    getAllUser(){
        return User.find();
    },

    getOneByParams(filter){
        return User.findOne(filter)
    },

    getOneById(id){
        return User.findById(id).select(['+cars']).populate('cars');
    },

    createUser(user){
        return User.create(user);
    },

    updateUserById(id,obj){
        return User.findOneAndUpdate({ _id:id }, obj,{ new:true })
    },

    deleteUserById(id){
        return User.deleteOne({_id:id})
    },

}