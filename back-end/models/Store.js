const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
     store_name: String,
     owner_id: String,
     category: String,
     logo_image: String,
     products: {
          type: Array,
          default: []
     },
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

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;