const {Router} = require('express');

const {userMiddleware, authMiddleware} = require('../middlewares');
const {authController} = require('../controllers');

const authRouter = Router();

authRouter.post('/login',
    userMiddleware.getUserDynamically('body','email','email'),
    authController.login);

authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
    );
authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);



module.exports = authRouter;