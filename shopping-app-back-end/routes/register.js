const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
     username: Joi.string().min(3).required(),
     password: Joi.string().min(6).required()
})

router.post('/register', async (req,res) => {
     // Validataion   
     const {error} = schema.validate(req.body);
     if (error) return res.status(400).send(error);
     
     // Hashing password
     const salt = await bcrypt.genSalt(10);
     
     const newUser = new User({
          username: req.body.username,
          password: req.body.password
     });

     try{
          const savedUser = await newUser.save();
          res.send(savedUser);
          res.send(console.log(`user: ${req.body.name} is successfully registered`));
     }catch(err){
          res.status(400).send(err);
     }
})



module.exports = router;