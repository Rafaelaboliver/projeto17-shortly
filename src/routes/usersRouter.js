import { Router } from "express";
import { postLogIn, postRegister} from "../controllers/usersController.js";
import { validateLogIn, validateRegister } from "../middlewares/validateUser.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { logInSchema, registerSchema } from "../schemas/userSchema.js";


const usersRouter = Router();

//(route: GET/customers)
usersRouter.post('/signup', validateSchema(registerSchema), validateRegister, postRegister);
usersRouter.post('/signin', validateSchema(logInSchema), validateLogIn, postLogIn)

export default usersRouter;