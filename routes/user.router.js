const {Router} = require('express');

const {userController} = require('../controllers');
const {userMiddleware,commonMiddleware, authMiddleware} = require('../middlewares');


const userRouter = Router();


userRouter.get('/',
    userController.getUsers
);// get all users

userRouter.get('/:userId',
    commonMiddleware.checkIfIdValid('userId'),
    userMiddleware.isUserPresent(),// here you already have user in req.user, so, you can get it in controller
    userController.getUserById
);// get only one user by ID

userRouter.post('/',
    userMiddleware.bodyValid,
    userMiddleware.checkIfUserEmailUniq,
    userController.createUser
); // create one user

userRouter.delete('/:userId',
    commonMiddleware.checkIfIdValid('userId'),
    userMiddleware.isUserPresent(),
    authMiddleware.checkAccessToken,
    userController.deleteUserById
);// delete one user by ID

userRouter.put('/:userId',
    commonMiddleware.checkIfIdValid('userId'),
    userMiddleware.isUserPresent(),
    userMiddleware.checkIfUserEmailUniq,
    authMiddleware.checkAccessToken,
    userController.updateUserById
); // update one user by ID


module.exports = userRouter;