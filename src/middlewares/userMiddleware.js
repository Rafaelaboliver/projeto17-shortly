import connection from "../config/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from "uuid";


export async function registerVerifications(req, res, next) {
    const { name, email, password } = req.body;

    try {
        const user = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

        const accountCreated = user.rows.length !== 0;
        if (accountCreated) {
            return res.sendStatus(409);
        }

        const salt = await bcrypt.genSalt(10);
        const cryptoPassword = await bcrypt.hash(password, salt);

        res.locals.register = {
            name,
            email,
            cryptoPassword,
        };

        next();
    } catch (error) {
        return res.status(500).send("Server error: " + error);
    }
}

export async function logInVerifications(req, res, next) {
    const { email, password } = req.body;
    try {
        const register = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

        const checkRegister = register.rows.length !== 0;
        if (!checkRegister) {
            return res.sendStatus(401);
        }

        const data = register.rows[0];

        const checkPassword = await bcrypt.compare(password, data.password);

        if (!checkPassword) {
            return res.status(401).send("Password is incorrect");
        }

        res.locals.session = {
            userId: data.id,
            token: uuidV4(),
        };

        next();
    } catch (error) {
        return res.status(500).send("server error: " + error);
    }
}

export async function userShortedUrlsVerifications(req, res, next) {
const { userId } = res.locals.session;


    try {
        const data = await connection.query(`SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount", 
        json_agg(json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) AS "shortenedUrls"
        FROM users
        JOIN urls ON users.id = urls."userId"
        WHERE users.id = $1
        GROUP BY users.id`, [userId]);

        const user = data.rows[0];

        if (data.rows.length === 0) return res.status(404).send('No url found');
        res.locals.user = user;
        next();
    } catch (error) {
        return res.status(500).send("server error: " + error);
    }
}

