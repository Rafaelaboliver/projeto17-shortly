import { Router } from "express";
import { getShortenUrl, postUrlShorten } from "../controllers/urlShortenController.js";
import { validateHeader } from "../middlewares/validateHeader.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlId, UrlShorten } from "../middlewares/validateUrlShorten.js";
import { urlShorten } from "../schemas/urlShortenSchema.js";

const urlShortenRouter = Router();

urlShortenRouter.post('/urls/shorten', validateHeader, validateSchema(urlShorten), UrlShorten, postUrlShorten);
urlShortenRouter.get('/urls/:id', urlId, getShortenUrl);

export default urlShortenRouter;