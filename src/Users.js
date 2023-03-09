import React, { useState, useEffect } from 'react';

function Users() {
  const [players, setPlayers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    fetch('http://192.168.5.52:5000/api/players')
      .then(response => response.json())
      .then(data => setPlayers(data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    fetch('http://192.168.5.52:5000/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ player_first_name: firstName, player_last_name: lastName })
    })
      .then(response => response.json())
      .then(data => {
        setPlayers([...players, data]);
        setFirstName('');
        setLastName('');
      });
  };

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.player_id}>{player.player_first_name} {player.player_last_name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} />
        <button type="submit">Create Player</button>
      </form>
    </div>
  );
}

export default Users;
