import express from "express";
import Player from "../models/player.model.js";
import mongoose from "mongoose";
import axios from 'axios';
import { createPlayer } from "../controllers/player.controller.js";

const router = express.Router();

router.get("/:summonername/:summonertag", createPlayer);

router.post("/", async (req, res) => {
    const player = req.body;

    const newPlayer = new Player(player);
    const requiredFields = [
        'puuid',
        'matches',
        'gameType',
        'playerNumber',
        'playerChamp',
        'playerKills',
        'playerDeaths',
        'playerAssists',
        'champLevel',
        'items'
    ];

    const missingFields = requiredFields.filter(field => !player[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ 
            success: false, 
            message: `Missing required fields: ${missingFields.join(', ')}` 
        });
    }
    try{
        await newPlayer.save();
        res.status(201).json({success: true, data: newPlayer});
    }catch(error){
        console.error("Error in Create player", error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
});

export default router;