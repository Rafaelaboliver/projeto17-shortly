import { Router } from "express";
import { postUrlShorten } from "../controllers/urlShortenController.js";
import { validateHeader } from "../middlewares/validateHeader.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { UrlShorten } from "../middlewares/validateUrlShorten.js";
import { urlShortenSchema } from "../schemas/urlShortenSchema.js";

const urlShortenRouter = Router();

urlShortenRouter.post('/urls/shorten', validateHeader, validateSchema(urlShortenSchema), UrlShorten, postUrlShorten)