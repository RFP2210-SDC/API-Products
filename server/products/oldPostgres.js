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
    // await client.end()
  } catch (err) {
    console.log(err);
  }
}

doWork();

// run this file: node /Users/RyanGehris/hack-reactor-sdc/API-Products/server/products/postgres.js
// run schema file: node /Users/RyanGehris/hack-reactor-sdc/API-Products/server/schema.sql
// login to psql: psql -h localhost -p 5432 -U postgres -W

// queries

// error: relation "related" does not exist
// is this because it is looking for related in products database, but products DB has no tables?
// would it be better to search "public" or to make sure the tables are in products and then set a search path

module.exports.getRelated = function(product_id, cb) {
  const query = {
    text: 'SELECT related_product_id FROM related WHERE current_product_id = $1',
    values: [product_id],
    rowMode: 'array',
  }

  client
    .query(query)
    .then(res => {
      console.log(res.rows);
      cb(null, res.rows);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
}

module.exports.getProductList = function(params, cb) {
  let page = params.page || 1;
  let count = params.count || 5;
  let offset = (page - 1) * count;

  const query = {
    text: 'SELECT * FROM product OFFSET $1 LIMIT $2',
    values: [offset, count],
  }

  client
    .query(query)
    .then(res => {
      // console.log(res.rows);
      cb(null, res.rows);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
}