const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const router = express.Router();

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
    '/',
    [
        check('name', 'Please add name')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email!').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                res.status(400).json({ msg: 'User already exist!' });
            }

            user = new User({ name, email, password });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = { user: { id: user.id } };
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (error) {
            console.error(error.message);
            res.send(500).send('Server error!');
        }
    }
);

module.exports = router;
