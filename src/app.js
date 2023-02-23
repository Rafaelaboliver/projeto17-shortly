import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./routes/usersRouter.js";
import urlShortenRouter from "./routes/urlShortenRouter.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([usersRouter, urlShortenRouter]);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));