const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async(req,res)=>{

    const hashedPassword = await bcrypt.hash(req.body.password,10);

    const user = new User({

        email: req.body.email,

        password: hashedPassword
    });

    await user.save();

    res.json({
        msg: "User Registered Successfully"
    });
});

router.post("/login", async(req,res)=>{

    const user = await User.findOne({
        email: req.body.email
    });

    if(!user){

        return res.json({
            msg: "User Not Found"
        });
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if(!validPassword){

        return res.json({
            msg: "Invalid Password"
        });
    }

    const token = jwt.sign(
        {id:user._id},
        "secretkey"
    );

    res.json({
        token
    });
});

module.exports = router;