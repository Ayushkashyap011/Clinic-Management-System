const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
});

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
