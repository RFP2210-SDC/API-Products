const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdb', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('strictQuery', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const StyleSchema = new mongoose.Schema({
    style_id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    default_style: Boolean,
    photos: [{thumbnail_url: String, url: String}],
    skus: [Object]
  });

  const ProductSchema = new mongoose.Schema({
    product_id: Number,
    name: String,
    // campus: {type: String, default: "hr-rfp"},
    slogan: String,
    description: String,
    category: String,
    default_price: Number,
    features: [{feature: String, value: String}],
    related: [Number],
    results: [StyleSchema]
  }, {timestamps: true});

  const Product = mongoose.model('Product', ProductSchema);

  // let abc = new Product({product_id: 1, name: "pants", slogan: "Hello World", description: "They are so fancy", category: "mens", default_price: 10, features: [{feature: "yellow", value: "cotton"}, {feature: "black", value: "leather"}], related: [1,2,3,4], campus: undefined, results: {style_id: 123445, name: "coco puffs", original_price: 10, sale_price: 1, default_style: false, photos: [{thumbnail_url: "xxxxx", url: "yyyyyy"}], skus: [{9999: {quantity: 10, size: "xs"}}]}});

  // setTimeout(function() {
  //   console.log('tell me ', abc.createdAt);
  // }, 3000);

  // const Style = mongoose.model('Style', StyleSchema);
})

// to create database use-> node /Users/RyanGehris/hack-reactor-sdc/API-Products/server/products/mongoDB.js
// to show databases use-> show databases
// to use DB-> use <database>
// to show collections-> show collections

// db.products.insertOne({product_id: 1, name: "pants", slogan: "Hello World", description: "They are so fancy", category: "mens", default_price: 10, features: [{feature: "yellow", value: "cotton"}, {feature: "black", value: "leather"}], related: [1,2,3,4], campus: undefined, results: {style_id: 123445, name: "coco puffs", original_price: 10, sale_price: 1, default_style: false, photos: [{thumbnail_url: "xxxxx", url: "yyyyyy"}], skus: [{9999: {quantity: 10, size: "xs"}}]}});