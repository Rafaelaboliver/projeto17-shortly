import { Router } from "express";
import { postLogIn, postRegister} from "../controllers/usersController.js";
import { validateLogIn } from "../middlewares/validateLogIn.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { logInSchema } from "../schemas/logInSchema.js";


const usersRouter = Router();

//(route: GET/customers)
usersRouter.post('/signup', postRegister);
usersRouter.post('/signin', validateSchema(logInSchema), validateLogIn, postLogIn)

export default usersRouter;