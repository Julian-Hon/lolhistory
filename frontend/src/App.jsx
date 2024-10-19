import React,  {useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [player, setPlayer] = useState(null);
  const [summonerName, setSummonerName]= useState('');
  const [summonerTag, setSummonerTag] = useState('');
  const [profileVisible, setProfileVisible] = useState(false);
  const [matchHistory, setMatchHistory] = useState(false);
  const [displayedSummonerName, setDisplayedSummonerName] =useState('');
  const [displayedSummonerTag, setDisplayedSummonerTag]= useState('');


  const fetchSummoner = async () =>{
    try {
      const response= await fetch(`/api/${summonerName}/${summonerTag}`);
      const result = await response.json();
      setPlayer(result);
      setProfileVisible(true);
      setMatchHistory(true);
      setDisplayedSummonerName(summonerName);
      setDisplayedSummonerTag(summonerTag);
    } catch(error){
      console.error("error");
    }
  }
  return (
      <div>
        <div className="searchbar">
          <input 
          type= "text"
          placeholder='Enter your summoner name'
          value = {summonerName}
          onChange={(e)=> setSummonerName(e.target.value)}
          >
          </input>
          <input 
          type= "text"
          placeholder='Enter your summoner tag'
          value = {summonerTag}
          onChange={(e)=> setSummonerTag(e.target.value)}>
          </input>
          <button onClick={fetchSummoner}>Fetch</button>
        </div>
        {profileVisible &&
        <div className="profile">
            <div className="image-container">
              <img className="profileIcon" src ={`https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/${player.data.profileIcon}.png`}
              />
              <span className = "overlay-number">{player.data.summonerLevel}</span>
            </div>
            <div className ="name">
              <div>{displayedSummonerName}#{displayedSummonerTag}</div>

            </div>
        </div>
}
        {matchHistory &&
        <div className ="match-history">
        {player && <div>{player.data.puuid}</div>}
        </div>
}
      </div>
  )
}

export default App
