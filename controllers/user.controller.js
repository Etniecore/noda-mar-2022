const {userService, passwordService} = require('../services');
const {statusCodes}= require('../constants')

module.exports = {

    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUser();

            res.status(statusCodes.OK).json(users);
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
         const {user} = req;

            res.status(statusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hashPassword(req.body.password);

            const user = await userService.createUser({...req.body, password: hashedPassword})

            res.status(statusCodes.CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            await userService.deleteUserById(userId);

            res.status(statusCodes.OK).json('User was removed');
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.updateUserById(userId, req.body);

            res.status(statusCodes.CREATE).json(user);
        } catch (e) {
            next(e);
        }
    }
}