const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const productSchema = new mongoose.Schema({

  });

  const Product = mongoose.model('Product', productSchema);

  const styleSchema = new mongoose.Schema({

  });

  const Style = mongoose.model('Style', styleSchema);
})