const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     username: {
          type: String,
          required : true,
          unique: true,
          trim: true,
          min: 5,
          max: 30
     },
     password: {
          type: String,
          required: true,
          min: 6
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
