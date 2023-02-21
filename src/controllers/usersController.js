import dayjs from "dayjs";
import connection from "../config/database.js";
import bcrypt from 'bcrypt';

export async function postUsers(req, res) {
    const {name, email, password, confirmPassword} = req.body;
    try {
        const createdDay = dayjs();
        const salt = await bcrypt.genSalt(10);
        const cryptoPassword = await bcrypt.hash(password, salt);

        await connection.query('INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)', [name, email, cryptoPassword, createdDay])
        res.status(201).send();
    
    } catch (error) {
        return res.status(500).send('server error: ' + error)
    };
}

