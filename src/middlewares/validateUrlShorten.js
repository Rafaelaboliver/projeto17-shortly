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

export async function urlId(req, res, next) {
  const { id } = req.params;

  try {
    const url = await connection.query('SELECT id, "shortUrl", url FROM urls WHERE id = $1', [id]);

    if (url.rows.length === 0) return res.status(404).send();

    res.locals.url = result.rows[0];
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}