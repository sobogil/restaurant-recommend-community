const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      isAdmin: true
    });

    console.log('Admin account created:', admin);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin:', error);
    mongoose.connection.close();
  }
};

createAdmin(); 