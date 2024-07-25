const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const TMDB_API_KEY = '3748671b4417fa97a83b8f693cc093a6';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Get popular movies
router.get('/popular', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search movies by title
router.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
