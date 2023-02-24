import connection from "../config/database.js";

export async function postUrlShorted(req, res) {
  const { userId, url, shortUrl } = res.locals.url;
  try {
    await connection.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ( $1, $2, $3);', [userId, url, shortUrl]);

    const urlGenerated = await connection.query('SELECT id,"shortUrl" FROM urls WHERE url = $1;', [url]);

    return res.status(201).send(urlGenerated.rows[0]);
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function getShortedUrl(req, res) {
  const { url } = res.locals;
  try {
    res.status(200).send(url);
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function getRedirectUrl(req, res) {
  const { url } = res.locals;
  try {
    res.redirect(url);
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function deleteUrlShorted(req, res) {
  const { url } = res.locals.url;

  try {
    await connection.query('DELETE FROM urls WHERE url = $1;', [url]);
    res.status(204).send();
  } catch (error) {
    return res.status(500).send("server error: " + error);
  }
}

export async function getUrlsRanking (req, res) {
  const { ranking } = res.locals;

  res.status(200).send(ranking); 
}