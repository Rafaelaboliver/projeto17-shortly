import connection from "../config/database.js";

export async function displayPeppa(req, res) {
    try {
        const peppa = await connection.query('SELECT * FROM peppameajuda;')
        res.status(200).send(peppa.rows);
    } catch (error) {
        return res.status(500).send('server error: ' + error)
    };
}