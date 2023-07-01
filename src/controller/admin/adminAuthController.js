const User = require("../../models/User") //Importing userSchema
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const env = require("dotenv")
const shortid = require("shortid")



//Signup API
exports.signup = (req, res) => {
    try {
        User.findOne({ email: req.body.email })
            .exec(async (error, user) => {
                if (error) {
                    success = false;
                    return res.status(400).json({ success, error: "Internal server error1" });
                }
                if (user) {
                    success = false;
                    return (res.status(400).json({ success, error: "Sorry a Admin with this email already exists" }))
                }
                const { firstName, lastName, email, password, phone } = req.body;
                const salt = await bcrypt.genSalt(10);
                const securedPassword = await bcrypt.hash(password, salt)
                const newUser = new User({ firstName, lastName, email, password: securedPassword, phone, userName: shortid.generate(), role: "admin" });
                newUser.save((error, data) => {
                    if (error) {
                        success = false;
                        return res.status(400).json({ success, error: "Internal server error1" });
                    }
                    if (data) {
                        res.status(201).json({
                            user: data,
                            msg: "Admin Created Successfully"
                        })
                    }
                })
            })
    } catch (error) {
        console.log(error);
        success = false;
        return res.status(500).send(success, "Internal server error3")
    }
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .exec(async (error, user) => {
            if (error) {
                success = false;
                return res.status(400).json({ success, error, msg: "User not registered" })
            }
            if (user) {
                if (user.role === "admin") {

                    const passwordCompare = await bcrypt.compare(password, user.password) //We are comparing the pw which is entered by the user and its original pw.It returns true or false.
                    if (!passwordCompare) {
                        //If pw does not matches
                        success = false;
                        return (res.status(400).json({ success, error: "Login with correct credentials" }))
                    }
                    const data = {
                        _id: user._id,
                        role: user.role
                    }
                    const authToken = jwt.sign(data, process.env.jwtSecret, { expiresIn: "1h" });
                    const { _id, firstName, lastName, email, role } = user;
                    res.cookie("authToken", authToken, { expiresIn: "1h" })
                    res.status(200).json({
                        authToken,
                        user: { _id, firstName, lastName, email, role }
                    })
                }
                else{
                    res.status(400).json({error:"Authorization required"})
                }
            }

            else {
                return res.status(400).json("Internal Server Error")
            }
        })
}

exports.signout = (req, res) => {
    res.clearCookie("authToken")
    res.status(200).json({ msg: "Signout Successfully." })
}





exports.requireSignin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const user = jwt.verify(token, process.env.jwtSecret);
        // console.log(user);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        success = false;
        return res.status(500).send(success, "Internal server error4")
    }
}
