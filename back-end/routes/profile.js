const router = require('express').Router();
const auth = require('../security/auth');
const User = require('../models/User');

router.get('/:id', auth, async (req,res) => {
     const user = await User.findOne({_id: req.params.id});
     if(user) return res.status(200).send({user});

     
})

module.exports = router;