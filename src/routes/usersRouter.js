import { Router } from "express";
import { postUsers } from "../controllers/usersController.js";


const usersRouter = Router();

//(route: GET/customers)
usersRouter.post('/signup', postUsers);

export default usersRouter;