const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);