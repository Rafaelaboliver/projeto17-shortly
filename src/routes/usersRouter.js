import { Router } from "express";
import { getUserShortedUrls, postLogIn, postRegister} from "../controllers/usersController.js";
import { headerAuthorization } from "../middlewares/tokenMiddleware.js";
import { logInVerifications, registerVerifications, userShortedUrlsVerifications } from "../middlewares/userMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { logIn, register } from "../schemas/userSchema.js";


const usersRouter = Router();

usersRouter.post('/signup', validateSchema(register), registerVerifications, postRegister);
usersRouter.post('/signin', validateSchema(logIn), logInVerifications, postLogIn);
usersRouter.get('/users/me', headerAuthorization, userShortedUrlsVerifications, getUserShortedUrls);
export default usersRouter;