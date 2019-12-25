const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
     name: {
          type: String,
          required : true,
          unique: true,
          trim: true,
          min: 1,
          max: 99
     },
     price:{
          required: true,
          type: Number
     },   
     stock: {
          required: true,
          type: Number
     },
     soldBy: {
          type: String,
          required: true
     },
     createdDate: {
          type: Date,
          default: Date.now
     }
     
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;