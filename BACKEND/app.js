import 'dotenv/config'; 
import express from 'express';
import {nanoid} from  "nanoid"
import connectDB from "./src/config/mongo.config.js"
import short_url from "./src/routes/short_url.route.js"
import auth_routes from "./src/routes/auth.routes.js"
import user_routes from "./src/routes/user.routes.js"
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors';
import { attachUser } from './src/utils/attachUser.js';
import cookieParser from 'cookie-parser';
import User from './src/models/user.model.js';

const app = express();

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:", error);
        res.status(500).json({ error: "Database connection failed" });
    }
});
app.use(cors({
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    credentials: true
}));
app.use(express.json()) //body parser
app.use(express.urlencoded({extended:true})) 
app.use(cookieParser())
app.use(attachUser)

app.use("/api/user", user_routes)
app.use("/api/auth", auth_routes)
app.use("/api/create", short_url)
app.get("/:id", redirectFromShortUrl)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.json({ message: 'Server is listening' });
})

app.listen(3001, () => {
    console.log("Server is running on port http://localhost:3001")
})

export default app;

//GET- redirection
//POST- create short url
//nanoid - generate unique IDs, no default export
