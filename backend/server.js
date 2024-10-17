import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import { connectDB } from './config/db.js';
import Player from './models/player.model.js';

import playerRoutes from "./routes/player.route.js"


dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api",playerRoutes);

console.log(process.env.MONGO_URI)

app.listen(PORT, async ()=>{
    await connectDB();
    console.log('server started at http://localhost:'+ PORT);
})
