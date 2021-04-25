const appError = require("./../utils/appError");

const User = require("./../models/userModel");

const jwt = require("jsonwebtoken");

const catchAsync = require("./../utils/catchAsync");

const constructToken = (id) => {
    return jwt.sign({ id }, process.env.jwt_secreat);
};

exports.signup = catchAsync(async (req, res) => {
    const user = await User.create(req.body);

    const token = constructToken(user._id);
    res.status(200).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
});

exports.userLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new appError("Please provide email or password", 400));

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user || !(await user.correctPassword(user.password, password))) {
        return next(new appError("Invalid email or password", 401));
    }

    const token = constructToken(user._id);

    res.status(200).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
});
