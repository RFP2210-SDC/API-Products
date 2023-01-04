const { Pool, Client } = require('pg');
require('dotenv').config()

const pool = new Pool({ idleTimeoutMillis: 30000 });

module.exports.getConnection = (cb) => {
  pool.connect((err, client, done) => {
    if (err) {
      cb(err.stack);
    } else {
      cb(null, client, done);
    }
  });
};

// run this file: node /Users/RyanGehris/hack-reactor-sdc/API-Products/server/products/postgres.js
// run schema file: node /Users/RyanGehris/hack-reactor-sdc/API-Products/server/schema.sql
// login to psql: psql -h localhost -p 5432 -U postgres -W

// queries

module.exports.getProductList = function(params, client, done, cb) {
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
      cb(null, res.rows);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    .finally(() => done())
}

module.exports.getProduct = function(product_id, client, done, cb) {

}

module.exports.getStyles = function(product_id, client, done, cb) {

}

module.exports.getRelated = function(product_id, client, done, cb) {
  const query = {
    text: 'SELECT related_product_id FROM related WHERE current_product_id = $1',
    values: [product_id],
    rowMode: 'array',
  }

  client
    .query(query)
    .then(res => {
      const response = [];
      res.rows.forEach((id) => {
        response.push(id[0])
      })
      cb(null, response);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    .finally(() => done())
}
