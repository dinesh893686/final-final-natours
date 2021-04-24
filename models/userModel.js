const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcryptjs")

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
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "A user must have valid email"]


    },

    password: {
        type: String,
        required: [true, "A user must have password"],
        minlen: [8, "a password must be greater than 8 characters"],
        trim: true,
    },

    confirmPassword: {
        type: String,
        required: [true, "A user must confirm password"],
        trim: true,

        validator: {


            // this only works for create and save
            validate: function (val) {

                return this.password == val

            },
            message: "consfirm password must be equal to password"
        }
    },
    photo: {

        type: String
    }

})

const User = mongoose.model('User', userSchema)

userSchema.pre('save', async function (next) {


    if (!this.isModified('password')) {
        return next()
    }
    else {

        this.password = await encrypt.hash(this.password, 12);

        // delete confirmPassword
        this.confirmPassword = undefined

    }

    return next()


}
)



module.exports = User