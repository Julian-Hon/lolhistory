import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import axios from 'axios';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;
app.use(cors())

app.get("/api/:summonername/:summonertag", async (req,res)=>{
    const {summonername, summonertag} = req.params;
    const RIOT_API_KEY = process.env.RIOT_API_KEY;
    try{
        const response = await axios.get(
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonername}/${summonertag}?api_key=${RIOT_API_KEY}` 
        );
        const pid = response.data.puuid;
        const response2 = await axios.get(
            `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${pid}/ids?start=0&count=5&api_key=${RIOT_API_KEY}` 
            );
        const matches = response2.data
        const gameTypes = [];
        const playerindex = [];
        const playerChampname =[];
        for(let i = 0; i<5;i++){
            const response3 = await axios.get(
                `https://americas.api.riotgames.com/lol/match/v5/matches/${matches[i]}?api_key=${RIOT_API_KEY}`
            );
            gameTypes.push(response3.data.info.gameMode);
            var player = response3.data.metadata.participants.indexOf(pid);
            playerindex.push(player);
            playerChampname.push(response3.data.info.participants[player].championName);
        }

            



        res.json({
            puuid: pid,
            matches: matches,
            matchdetails: gameTypes,
            playersindex: playerindex,
            playersChampname: playerChampname,
            });
        
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Error fetching data'});
    }
});

console.log(process.env.MONGO_URI)

app.listen(PORT, ()=>{
    connectDB();
    console.log('server started at http://localhost:'+ PORT);
})
