// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true, 
    unique: true 
},
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
  authProvider: { 
    type: String, 
    default: 'local' 
}, // e.g., 'Naver'
  profileImage: { 
    type: String 
},
  createdAt: { 
    type: Date, default: Date.now 
},
  updatedAt: { 
    type: Date, default: Date.now 
}
});

module.exports = mongoose.model('User', userSchema);
