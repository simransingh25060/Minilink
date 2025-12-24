import 'dotenv/config'; 
import express from 'express';
import {nanoid} from  "nanoid"
import connectDB from "./src/config/mongo.config.js"
import short_url from "./src/routes/short_url.route.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors';
import { attachUser } from './src/utils/attachUser.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json()) //body parser
app.use(express.urlencoded({extended:true})) 
app.use(cookieParser())
app.use(attachUser)


app.use("/api/auth", auth_routes)
app.use("/api/create", short_url)
app.get("/:id", redirectFromShortUrl)

app.use(errorHandler)

app.listen(3001, () => {
    connectDB()
    console.log("Server is running on port http://localhost:3001")
})

//GET- redirection
//POST- create short url
//nanoid - generate unique IDs, no default export