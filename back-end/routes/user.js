const router = require('express').Router();
const auth = require('../security/auth');
const User = require('../models/User');

// Profile Router


router.get('/', async(req,res) => {
     const user = await User.find({ public: true });
     

     return res.send(user);
})

router.post('/:id', async(req,res) => {
     const user = await User.findOne({ _id: req.params.id });
     return res.send(user);
})

router.delete('/', auth, async(req,res) => {
     const user = await User.deleteOne({ _id: req.body.id });
     res.send(user);
})





module.exports = router;