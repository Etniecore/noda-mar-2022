const Auth = require('../dataBase/Auth')

module.exports ={
    saveTokens: (tokens) =>{
        return Auth.create(tokens);
    },
    getOneByParams:(filter)=>{
        return Auth.findOne(filter);
    },
    getTokenWithUser: (filter) =>{
        return Auth.findOne(filter).populate('user');
    },
    deleteByParams:(filter) =>{
        return Auth.deleteOne(filter);
    },
}