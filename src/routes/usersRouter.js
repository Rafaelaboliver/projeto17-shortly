import { Router } from "express";
import { postLogIn, postRegister} from "../controllers/usersController.js";
import { logInVerifications, registerVerifications } from "../middlewares/userMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { logIn, register } from "../schemas/userSchema.js";


const usersRouter = Router();

usersRouter.post('/signup', validateSchema(register), registerVerifications, postRegister);
usersRouter.post('/signin', validateSchema(logIn), logInVerifications, postLogIn)

export default usersRouter;