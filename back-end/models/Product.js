const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
     value: String,
     img: String,
     public: {
          required: true,
          type: Boolean,
          default: true
     },
     stock: Number,
     soldBy: {
          type: String,
          required: true
     },
     numOfSold: Number,
     createdDate: {
          type: Date,
          default: Date.now
     }
     
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;