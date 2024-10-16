import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [player, setPlayer] = useState(null);
  const summonername = "";
  const summonertag = "";

  
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch(`/api/${summonername}/${summonertag}`)
      .then((response) => response.json())  // Parse the JSON response
      .then((player) => {
        setPlayer(player);  // Store the data in the state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [summonername, summonertag]);

  return (
      <div>
      {player ? <p>{player.puuid}</p> : <p>Loading...</p>}
      </div>
  )
}

export default App
