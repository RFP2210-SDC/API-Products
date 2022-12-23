const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
  port: process.env.PGPORT,
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
})

const doWork = async function() {
  await client.connect()
  try {
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
  } catch (err) {
    console.log(err);
  }
}

doWork();

// run this file: node /Users/RyanGehris/hack-reactor-sdc/API-Products/server/products/postgres.js
// run schema file: node /Users/RyanGehris/hack-reactor-sdc/API-Products/server/schema.sql
// login to psql: psql -h localhost -p 5432 -U postgres -W