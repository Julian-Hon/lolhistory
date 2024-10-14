import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    puuid:{
        type: String,
        required: true,
    },
}, {
    timestamps:true
});

const Player = mongoose.model('Player', playerSchema);
//players


export default Player;