const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    parent: {
        type: mongoose.ObjectId,
        ref: 'File',
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    children: [
        { type: mongoose.ObjectId, ref: 'File' }
    ],
    accessLink: {
        type: String,
    },
    path: {
        type: String,
        default: '',
    },
});

const File = mongoose.model('File', FileSchema);

module.exports = File;
