const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
const {getConnection, getRelated, getProductList, getStyles, getProduct} = require('./postgres.js')

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/products', (req, res) => {
  getConnection((err, client, done) => {
    if (err) {
      res.status(400).send(err);
    } else {
      getProductList(req.query, client, done, (err, data) => {
        if (err) {
          console.log(err)
          res.status(400).send(err);
        } else {
          res.status(200).send(data)
        }
      })
    }
  })
})

app.get('/products/:product_id', (req, res) => {
  getConnection((err, client, done) => {
    if (err) {
      res.status(400).send(err);
    } else {
      getProduct(parseInt(req.params.product_id), client, done, (err, data) => {
        if (err) {
          console.log(err)
          res.status(400).send(err);
        } else {
          res.status(200).send(data)
        }
      })
    }
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  getConnection((err, client, done) => {
    if (err) {
      res.status(400).send(err);
    } else {
      getStyles(parseInt(req.params.product_id), client, done, (err, data) => {
        if (err) {
          console.log(err)
          res.status(400).send(err);
        } else {
          res.status(200).send(data)
        }
      })
    }
  })
})

app.get('/products/:product_id/related', (req, res) => {
  getConnection((err, client, done) => {
    if (err) {
      res.status(400).send(err);
    } else {
      getRelated(parseInt(req.params.product_id), client, done, (err, data) => {
        if (err) {
          console.log(err)
          res.status(400).send(err);
        } else {
          res.status(200).send(data)
        }
      })
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
