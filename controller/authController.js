

const User = require('./../models/userModel')

const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')

exports.signup = catchAsync(async (req, res) => {

    const user = await User.create(req.body)


    const token = jwt.sign({ id: user._id }, process.env.jwt_secreat)
    res.status(200).json({

        status: "success",
        token,
        data: {
            user

        }


    })



}
)



// exports.

