// src/config/database.js
const postgres = require('postgres')

const connectionString = process.env.DATABASE_URL
const pool = postgres(connectionString, {
    ssl: { rejectUnauthorized: false }
})

module.exports = pool
