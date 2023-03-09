import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    fetch('http://192.168.5.52:5000/api/players')
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.log(err));
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form:", name, lastName);
    fetch('http://192.168.5.52:5000/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player_first_name: name,
        player_last_name: lastName
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Response:", data);
        setPlayers([...players, data]);
        setName('');
        setLastName('');
      })
      .catch(err => console.log(err));
  };  

  return (
    <div className="App">
      <h1>Players</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={name} onChange={handleNameChange} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
        <button type="submit">Add Player</button>
      </form>
      <ul>
        {players.map(player => (
          <li key={player.player_id}>{player.player_first_name} {player.player_last_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

