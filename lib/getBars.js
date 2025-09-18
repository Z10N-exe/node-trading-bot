// lib/getBars.js
const fetch = require('node-fetch');
require('dotenv').config();

const getBars = async ({ symbol, start, end }) => {
  const url = `https://data.alpaca.markets/v2/stocks/${symbol}/bars?timeframe=1Min&start=${start}&end=${end}`;
  const headers = {
    'APCA-API-KEY-ID': process.env.ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}...`);
    }
    const data = await response.json();
    return data.bars ? { [symbol]: data.bars } : {};
  } catch (error) {
    console.error(`getBars Error for ${symbol}:`, error.message);
    throw error;
  }
};

module.exports = getBars;