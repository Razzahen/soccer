const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Add this line to enable CORS

const pool = new Pool({
  connectionString: "postgres://ryanhuser:Razzahen123@ryanhserver.postgres.database.azure.com/soccer1?sslmode=require"
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

app.get('/api/players', (req, res) => {
  pool.query('SELECT * FROM player', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.post('/api/players', (req, res) => {
  const { player_first_name, player_last_name } = req.body;
  pool.query('INSERT INTO player (player_first_name, player_last_name) VALUES ($1, $2) RETURNING *', [player_first_name, player_last_name], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json(results.rows[0]);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
