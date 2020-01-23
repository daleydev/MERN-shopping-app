const router = require('express').Router();
const auth = require('../security/auth');
const User = require('../models/User');

router.get('/:id', auth, async (req,res) => {
     const user = await User.findOne({_id: req.params.id});
     if(user) return res.status(200).send({user});

     
})

router.post('/:id', auth, async (req,res) => {
     const username = req.body.username;
     const email = req.body.email;
     const user = await User.findOneAndUpdate({_id: req.params.id},{username:username,email:email});
     user.save();
     return res.send(user);

     // if(user) {
     //      const updatedUser = await User.findOneAndUpdate()
     // }else{
     //      return res.status(400).send({success: false, message: 'user not found'})     
          
     // }
     
     
})

module.exports = router;
