import connection from "../config/database";

export async function postUrlShorten (req, res) {
    const { userId, url, shortUrl } = res.locals.url;
    try {
      await connection.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ( $1, $2, $3);', [userId, url, shortUrl]);
  
      const urlGenerated = await connection.query('SELECT id,"shortUrl" FROM urls WHERE url = $1;', [url]);
  
      return res.status(201).send(urlGenerated.rows[0]);
    } catch (error) {
      return res.status(500).send("server error: " + error);
    }
  }