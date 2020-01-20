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
     description: {
          type: String,
          min: 1,
          max: 200
     },
     images: Array,
     public: {
          required: true,
          type: Boolean,
          default: true
     },
     stock: Number,
     store_id: {
          type: String,
          required: true
     },
     sold: Number,
     comments: Array,
     createdDate: {
          type: Date,
          default: Date.now
     }
     
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;