const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const seederFunc = require('./seed.js');

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//seeds database with data
db.once('open', function() {
  console.log('mongoose is connected')
  //Defines schema
  var productsSchema = new Schema ({
  name: String
  })

  //Creates Schema
  var Products = mongoose.model('Products', productsSchema);

  //Seeds db, accepts an array of objects
  var seed = seederFunc.productSeeder();
  Products.insertMany(seed, (err, docs) => {
    if (err) throw new Err(err);
    console.log(docs, 'seed succeeded');
  });
});



