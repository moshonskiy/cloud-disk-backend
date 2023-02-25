const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    diskSpace: {
        type: Number,
        default: 1024 ** 3 * 10,
    },
    usedSpace: {
        type: Number,
        default: 0,
    },
    avatar: String,
    files: [
        {
            type: mongoose.ObjectId,
            ref: 'File',
        }
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
