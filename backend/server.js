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
        const playerkills = [];
        const playerdeaths = [];
        const playerassists =[];
        const champLevel =[];
        const items =[];
        for(let i = 0; i<5;i++){
            const response3 = await axios.get(
                `https://americas.api.riotgames.com/lol/match/v5/matches/${matches[i]}?api_key=${RIOT_API_KEY}`
            );
            gameTypes.push(response3.data.info.gameMode);
            var player = response3.data.metadata.participants.indexOf(pid);
            playerindex.push(player);
            playerChampname.push(response3.data.info.participants[player].championName);
            playerkills.push(response3.data.info.participants[player].kills);
            playerdeaths.push(response3.data.info.participants[player].deaths);
            playerassists.push(response3.data.info.participants[player].assists);
            champLevel.push(response3.data.info.participants[player].champLevel);
            items[i]= [response3.data.info.participants[player].item0,response3.data.info.participants[player].item1,response3.data.info.participants[player].item2,response3.data.info.participants[player].item3,response3.data.info.participants[player].item4,response3.data.info.participants[player].item5,response3.data.info.participants[player].item6];
            
        }

            



        res.json({
            puuid: pid,
            matches: matches,
            matchdetails: gameTypes,
            playersindex: playerindex,
            playersChampname: playerChampname,
            playerkills: playerkills,
            playerdeaths: playerdeaths,
            playerassists: playerassists,
            champLevel: champLevel,
            items: items,
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
