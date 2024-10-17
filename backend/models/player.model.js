import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    puuid:{
        type: String,
        required: true,
    },
    matches:{
        type: [String],
        required: true,
    },
    gameType:{
        type: [String],
        required: true,
    },
    playerNumber:{
        type: [Number],
        required: true,
    },
    playerChamp:{
        type: [String],
        required: true,
    },
    playerKills:{
        type: [Number],
        required: true,
    },
    playerDeaths:{
        type:[Number],
        required: true,
    },
    playerAssists:{
        type:[Number],
        required: true,
    },
    champLevel:{
        type:[Number],
        required: true,
    },
    items:{
        type: [[Number]],
        required: true,
    },
}, {
    timestamps:true
});

const Player = mongoose.model('Player', playerSchema);
//players


export default Player;