const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "A user must have name"],
        maxlen: [40, "A user must have name less than 40 characters"],
        minlen: [10, "A user must have name more than 10 characters"],
        trim: true
    },

    email:
    {
        type: String,
        required: [true, "A user must have email"],

        trim: true,



    },

    password: {
        type: String,
        required: [true, "A user must have password"],

        trim: true,
    },

    confirmPassword: {
        type: String,
        required: [true, "A user must confirm password"],
        trim: true
    }






})

