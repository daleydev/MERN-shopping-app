const router = require('express').Router();
const auth = require('./auth');
const User = require('../models/User');

// Profile Router
router.get('/', auth, async(req,res) => {
     const user = await User.findOne({ _id: req.user._id });
     res.send(user);
})


module.exports = router;