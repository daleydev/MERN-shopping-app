const router = require('express').Router();
let User = require('../models/User');


// Users Router
router.get('/', async(req,res) => {
     
     const users = await User.find({ public: true });
     res.send(users);

     console.log(`index page loaded...`);
})




module.exports = router;