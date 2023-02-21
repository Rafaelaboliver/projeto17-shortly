import connection from "../config/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from "uuid";

export async function validateLogIn(req, res, next) {
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