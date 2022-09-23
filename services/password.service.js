const bcrypt = require('bcrypt');

const {ApiError} = require("../errors");
const {statusCodes}=require('../constants')

module.exports = {
    hashPassword: (password)=> bcrypt.hash(password,10)
    ,
    comparePasswords: (password, hashedPassword) => {
        const pass = bcrypt.compare(password, hashedPassword);
        if(!pass){
            throw new ApiError('Wrong password or email', statusCodes.BAD_REQUEST);
        }
    },
};