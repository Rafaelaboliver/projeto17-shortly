import { Router } from "express";
import { deleteUrlShorted, getRedirectUrl, getShortedUrl, postUrlShorted } from "../controllers/urlShortenController.js";
import { headerAuthorization } from "../middlewares/tokenMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { shortedUrlUserVerification, shortedUrlVerification, shortingUrl, urlIdVerification } from "../middlewares/urlShortenMiddleware.js";
import { urlGiven } from "../schemas/urlGivenSchema.js";

const urlShortenRouter = Router();

urlShortenRouter.post('/urls/shorten', headerAuthorization, validateSchema(urlGiven), shortingUrl, postUrlShorted);
urlShortenRouter.get('/urls/:id', urlIdVerification, getShortedUrl);
urlShortenRouter.get('/urls/open/:shortUrl', shortedUrlVerification, getRedirectUrl);
urlShortenRouter.delete('/urls/:id', headerAuthorization, shortedUrlUserVerification, deleteUrlShorted);

export default urlShortenRouter;

