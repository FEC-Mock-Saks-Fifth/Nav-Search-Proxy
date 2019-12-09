const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = mongoose.createConnection('mongodb://localhost/products');

var productsSchema = new Schema ({
  name: String
})

const Products = conn.model('Products', productsSchema)

module.exports.autoSearch = (query) => {
  var regex = new RegExp(`^${query}|\\b${query}`, `i`)
  return new Promise((resolve, reject) => {
    Products.find({ "name": regex}, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
    .limit(8);
  })
}