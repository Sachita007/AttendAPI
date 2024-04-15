const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: [true, "Provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email "],
    },
    password: {
        type: String,
        required: [true, "password cannot be empty"],
        minlength: 8,
        select: false,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    cpassword: {
        type: String,
        required: [true, "Confirm Password cannot be empty"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
        },
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['Admin', 'Student', 'Teacher'],
        required: true
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
