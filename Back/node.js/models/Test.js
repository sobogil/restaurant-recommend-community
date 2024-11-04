const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    });
testSchema.set('timestamps', true);
module.exports = mongoose.model('Test', testSchema)