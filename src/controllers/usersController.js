import connection from "../config/database.js";
import bcrypt from 'bcrypt';

export async function postRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const cryptoPassword = await bcrypt.hash(password, salt);

        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, cryptoPassword])
        res.status(201).send();

    } catch (error) {
        return res.status(500).send('server error: ' + error)
    };
}

export async function postLogIn(req, res) {
    const { userId, token } = res.locals.session;
    try {
        await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [userId, token]);

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send("server error: " + error);
    }
}
