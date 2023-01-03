const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/products', (req, res) => {
  // SELECT * FROM product
  //   returns id, name, slogan, description, category, default_price
  //   include count and page
  res.status(200).send('product list');
})

app.get('/products/:product_id', (req, res) => {
  // SELECT * FROM product WHERE product_id=${product_id}
  //   returns id, name, slogan, description, category, default_price, features (array)
  res.status(200).send('individual product');
})

app.get('/products/:product_id/styles', (req, res) => {
  // SELECT * FROM style WHERE style_product_id=${product_id}
  //   returns product_id, results (obj)
  //     within results object: style_id, name, original_price, sale_price, default, photos (array of objects), skus (obj)
  res.status(200).send('styles');
})

app.get('/products/:product_id/related', (req, res) => {
  // SELECT related_product_id FROM related WHERE current_product_id=${product_id};
  //   returns an array of product_ids
  res.status(200).send('related');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
