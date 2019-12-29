const router = require('express').Router();
let User = require('../models/User');


// Users Router
router.get('/', async(req,res) => {
     res.send('Welcome. This is home page');

     console.log(`index page loaded...`);
})




module.exports = router;