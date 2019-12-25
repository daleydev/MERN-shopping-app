const router = require('express').Router();
const auth = require('./auth');
const User = require('../models/User');

router.get('/', auth, async(req,res) => {
     const user = await User.findOne({ _id: req.user._id });
     res.send(user);
})


module.exports = router;