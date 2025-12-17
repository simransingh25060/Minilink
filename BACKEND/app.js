import 'dotenv/config'; 
import express from 'express';
import {nanoid} from  "nanoid"
import connectDB from "./src/config/mongo.config.js"
import short_url from "./src/routes/short_url.route.js"
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';


const app = express();

app.use(express.json()) //body parser
app.use(express.urlencoded({extended:true})) 

app.use("/api/create", short_url)

app.get("/:id", redirectFromShortUrl)


app.listen(3001, () => {
    connectDB()
    console.log("Server is running on port http://localhost:3001")
})

//GET- redirection
//POST- create short url
//nanoid - generate unique IDs, no default export