import { nanoid } from "nanoid";

export async function UrlShorten(req, res, next) {
  const { url } = req.body;
  const { session } = res.locals;
  try {
    const shortUrl = nanoid(8);

    res.locals.url = {
      userId: session.userId,
      url,
      shortUrl,
    };

    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}