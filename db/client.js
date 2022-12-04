const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/grace-shopper';

const client = new Pool({
  idleTimeoutMillis: 0,
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

client.on('error', (err, client) => {
  console.error('Unexpected database error occurred', err);
});

module.exports = client;
