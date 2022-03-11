const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter first name'],
            trim: true,
        },

        lastName: {
            type: String,
            required: [true, 'Please enter last name'],
            trim: true,
        },

        email: {
            type: String,
            required: [true, 'Please enter e-mail address'],
            unique: true
        },

        phoneNo: {
            type: Number,
            required: [true, 'Please enter phone number'],
            maxlength: [10, 'quantity cannot exceed 10 characters'],
            default: 00
        },

        address: {
            type: Object,
            required: [true, 'Please enter address']
        },

        gender: {
            type: String,
            enum: ["male", "female", "prefer not to say"],
            required: [true, 'Please enter gender']
        },

        dob: {
            type: Date,
            required: [true, 'Please enter date of birth']
        },

        createdAt: {
            type: Date,
            default: Date.now
        } 
    }
)

module.exports = mongoose.model('User', UserSchema)