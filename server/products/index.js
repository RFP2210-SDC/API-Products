const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/products', (req, res) => {
  //SELECT * FROM product
})

app.get('/products/:product_id', (req, res) => {
  //SELECT * FROM product WHERE product_id=${product_id}
})

app.get('/products/:product_id/styles', (req, res) => {
  //SELECT * FROM style WHERE style_product_id=${product_id}
})

app.get('/products/:product_id/related', (req, res) => {
  //SELECT related_product_id FROM related WHERE current_product_id=${product_id};
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
