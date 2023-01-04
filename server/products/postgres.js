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
      cb(null, res.rows[0]);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    .finally(() => done())
}

module.exports.getProduct = function(product_id, client, done, cb) {
  // SELECT * FROM product WHERE product_id=${product_id}
    //   returns id, name, slogan, description, category, default_price, features (array)
  const productQuery = {
    text: 'SELECT * FROM product WHERE product_id = $1',
    values: [product_id]
  }

  const featureQuery = {
    text: 'SELECT feature, value FROM feature WHERE feature_product_id = $1',
    values: [product_id]
  }

  const result = {}
  client
    .query(productQuery)
    .then(res => {
      Object.assign(result, res.rows[0])
      return client.query(featureQuery)
    })
    .then(res => {
      Object.assign(result, {feature: [res.rows]});
      cb(null, result);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    .finally(() => done())
}

module.exports.getStyles = function(product_id, client, done, cb) {
  // SELECT * FROM style WHERE style_product_id=${product_id}
  //   returns product_id, results (obj)
  //     within results object: style_id, name, original_price, sale_price, default, photos (array of objects), skus (obj)
  const queryStyles = {
    text: 'SELECT style_id, name, original_price, sale_price, default_style FROM style WHERE style_product_id = $1',
    values: [product_id],
  }

  const queryPhotos = {
    text: 'SELECT thumbnail_url, url, style_id FROM photo INNER JOIN style ON photo_style_id = style_id AND style_product_id = $1',
    values: [product_id],
  }

  const querySku = {
    text: 'SELECT id, sku_style_id, size, quantity FROM sku INNER JOIN style ON sku_style_id = style_id AND style_product_id = $1'
    values: [product_id],
  }
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
