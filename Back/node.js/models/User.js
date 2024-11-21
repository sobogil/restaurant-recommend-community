// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  isAdmin: {
    type: Boolean,
    default: false
  },
  authProvider: { 
    type: String, 
    default: 'local' 
}, // e.g., 'Naver'
  profileImage: { 
    type: String 
},
});
userSchema.set('timestamps', true);
module.exports = mongoose.model('User', userSchema);
