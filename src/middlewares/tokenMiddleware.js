import connection from "../config/database.js";


export async function headerAuthorization (req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send();

  try {
    const session = await connection.query('SELECT * FROM sessions WHERE token = $1 ',[token]);

    if (session.rows.length === 0)
      return res.status(401).send();

    res.locals.session = session.rows[0];

    next();
  } catch (error) {
    res.status(500).send(error);
  }
}