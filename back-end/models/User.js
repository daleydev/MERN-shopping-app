const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     username: {
          type: String,
          required : true,
          unique: true,
          trim: true,
          min: 5,
          max: 30
     },
     email:{
          required: true,
          type: String,
          unique: true
     },   
     password: {
          type: String,
          required: true,
          min: 6,
          max: 30
     },
     public: {
          type: Boolean,
          default: true
     },
     image: String,
     cart: {
          type: Array,
          default: []
     },
     stores: {
          type: Array,
          default: []
     },
     createdDate: {
          type: Date,
          default: Date.now
     }
     
}
// {
//      timestamps: true
// }
);


const User = mongoose.model('User', userSchema);

module.exports = User;
