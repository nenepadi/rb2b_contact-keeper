const express = require('express');
const router = express.Router();

// @route       GET api/auth
// @desc        Get loggedin user
// @access      Private
router.get('/', (req, res) => {
    res.send('Get logged in user');
});

// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post('/', (req, res) => {
    res.send('Authenticate users!');
});

module.exports = router;
