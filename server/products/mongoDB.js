const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdb', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('strictQuery', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const styleSchema = new mongoose.Schema({
    style_id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    default_style: Boolean,
    photos: [{thumbnail_url: String, url: String}],
    skus: [{id: {size: String, quantity: Number}}]
  });

  const productSchema = new mongoose.Schema({
    product_id: Number,
    name: String,
    campus: {type: String, default: "hr-rfp"},
    slogan: String,
    description: String,
    category: String,
    default_price: Number,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    features: [{feature: String, value: String}],
    // results: [styleSchema],
    related: [Number],
  });

  const Product = mongoose.model('Product', productSchema);

  const Style = mongoose.model('Style', styleSchema);
})

// to create database use-> node /Users/RyanGehris/hack-reactor-sdc/API-Products/server/products/mongoDB.js
// to show databases use-> show databases
// to use DB-> use <database>
// to show collections-> show collections