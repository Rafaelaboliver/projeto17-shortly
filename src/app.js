import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import peppaRouter from "./routes/peppaRouter.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([peppaRouter]);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));