const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
     name: String,
     owner_id: String,
     logo: String,
     products: Array,
     public: {
          type: Boolean,
          default: true
     },
     createdDate: {
          type: Date,
          default: Date.now
     }
     
}
);

const Product = mongoose.model('Store', storeSchema);

module.exports = Product;