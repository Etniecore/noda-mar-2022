const Joi = require('joi');

const {EMAIL,PASSWORD} = require('../constants/regex.enum');
const IDValidator = require('./common.validator');
const {ApiError} = require("../errors");
const {BAD_REQUEST} = require("../constants/statusCode.enum");

const newUserValidator =  Joi.object({
    name: Joi.string().alphanum().min(2).max(35).required(),
    age: Joi.number().integer().min(1).max(120),
    email: Joi.string().regex(EMAIL).required().trim().lowercase().error(new ApiError('Email is not valid', BAD_REQUEST)),
    password: Joi.string().regex(PASSWORD).required().error(new ApiError('Password is not valid', BAD_REQUEST)),
    cars: Joi.array().items(IDValidator),
})

module.exports = newUserValidator;