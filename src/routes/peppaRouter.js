import { Router } from "express";
import { displayPeppa } from "../controllers/peppaController.js";


const peppaRouter = Router();

//(route: GET/customers)
peppaRouter.get('/peppa', displayPeppa);

export default peppaRouter;