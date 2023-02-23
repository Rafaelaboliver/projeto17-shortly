import { nanoid } from "nanoid";
import connection from "../config/database.js";

export async function shortingUrl(req, res, next) {
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

export async function urlIdVerification(req, res, next) {
  const { id } = req.params;

  try {
    const url = await connection.query('SELECT id, "shortUrl", url FROM urls WHERE id = $1;', [id]);

    if (url.rows.length === 0) return res.status(404).send();

    res.locals.url = url.rows[0];
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function shortedUrlVerification(req, res, next) {
  const { shortUrl } = req.params;

  try {
    const url = await connection.query('SELECT url FROM urls WHERE "shortUrl" = $1', [shortUrl]);

    if (url.rows.length === 0) return res.status(404).send();

    await connection.query('UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;', [shortUrl]);

    res.locals.url = url.rows[0].url;
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }


}

export async function shortedUrlUserVerification(req, res, next) {
  const { id } = req.params;
  const { userId } = res.locals.session;

  try {
    const urlUser = await connection.query('SELECT * FROM urls WHERE id = $1;', [id]);
    console.log('entrei no if');

    if (urlUser.rows.length === 0) return res.status(404).send();
    if (urlUser.rows[0].userId !== userId) return res.status(401).send();

    res.locals.url = urlUser.rows[0];
    next();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function rankingVerification (req, res, next) {
  try {
    const ranking = await connection.query(`SELECT users.id, users.name, COALESCE(links_count, 0) AS "linksCount", COALESCE(visit_count, 0) AS "visitCount"
    FROM users
    LEFT JOIN (
      SELECT "userId", COUNT(*) AS links_count, SUM("visitCount") AS visit_count
      FROM urls
      GROUP BY "userId"
    ) AS url_counts ON users.id = url_counts."userId"
    ORDER BY visit_count DESC NULLS LAST, links_count DESC NULLS LAST, users.id ASC
    LIMIT 10`);

    res.locals.ranking = ranking.rows;
    next();
    
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}
