const express = require('express')
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'thisIsASafeStringTosignWebToken';

// Create  a User using : POST "/api/auth/createUser". No login required
router.post('/createUser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', "Enter a valid name ").isLength({ min: 3 }),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // console.log(req.body);
    //If there are errors, return Bad request and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with same email exist already 
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user exist with same email" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email
        });

        const data = {
            user :{
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(JWTdata);
        res.json({authToken});

    } catch (error) {
        console.log(error);
        res.status(500).json("Some error occured"); 
    }

})
module.exports = router;