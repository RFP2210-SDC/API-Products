const { Pool, Client } = require('pg');
require('dotenv').config()

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  idleTimeoutMillis: 30000
});

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
  let first_id = (page - 1) * count;
  let last_id = first_id + parseInt(count);

  // const query = {
  //   text: 'SELECT * FROM product OFFSET $1 LIMIT $2',
  //   values: [offset, count],
  // }
  // const query = {
  //   text: 'SELECT * FROM product WHERE product_id >= $1 AND product_id <= $2',
  //   values: [(first_id + 1), last_id],
  // }
  const query = {
    text: 'SELECT * FROM product WHERE product_id >= $1 ORDER BY product_id ASC LIMIT $2',
    values: [first_id, count],
  }

  client
    .query(query)
    .then(res => {
      console.log(res.rows)
      cb(null, res.rows);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    .finally(() => done())
}

module.exports.getProduct = function(product_id, client, done, cb) {
  const query = {
    text: 'SELECT product_id, name, slogan, description, category,default_price, JSONB_AGG(JSONB_BUILD_OBJECT(\'feature\', feature, \'value\', value)) AS features FROM product LEFT JOIN feature ON product_id = feature_product_id WHERE product_id = $1 GROUP BY product_id',
    values: [product_id]
  }

  client
    .query(query)
    .then(res => {
      cb(null, res.rows[0]);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    .finally(() => done())
}

module.exports.getStyles = function(product_id, client, done, cb) {
  const queryStyles = {
    text: 'SELECT style_id, name, original_price, sale_price, default_style, JSONB_AGG(JSONB_BUILD_OBJECT(\'url\', url, \'thumbnail_url\', thumbnail_url)) AS photos FROM style LEFT JOIN photo ON style_id = photo_style_id WHERE style_product_id = $1 GROUP BY style_id',
    values: [product_id],
  }
  // cannot next JSON_AGG inside of jsonb_object_agg(name, value)
  const querySku = {
    text: 'SELECT style_id, sku.id, quantity, size FROM style  LEFT JOIN sku ON style_id = sku_style_id WHERE style_product_id = $1',
    values: [product_id]
  }

  const result = {product_id: product_id}
  client.query(queryStyles)
    .then(res => {
      Object.assign(result, {results: res.rows});
      return client.query(querySku)
    })
    .then(res => {
      newResult = helperFunction(result.results, res.rows)
      result.results = newResult
      cb(null, result);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    .finally(() => done())
}

module.exports.getRelated = function(product_id, client, done, cb) {
  const query = {
    text: 'SELECT JSONB_AGG(related_product_id) FROM related WHERE current_product_id = $1',
    values: [product_id],
    rowMode: 'array',
  }

  client
    .query(query)
    .then(res => {
      cb(null, res.rows[0][0]);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    .finally(() => done())
}


const helperFunction = function(arr, arr2) {
  const skuObj = {};
  arr2.forEach((row) => {
    if (!skuObj[row.style_id]) {
      var newObj = {}
      newObj[row.id] = {quantity: row.quantity, size: row.size}
      skuObj[row.style_id] = newObj;
    } else {
      var newObj = {}
      newObj[row.id] = {quantity: row.quantity, size: row.size}
      Object.assign(skuObj[row.style_id], newObj)
    }
  })
  arr.forEach((style) => {
    style.skus = skuObj[style.style_id];
  })
  return arr;
}