const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
     username: Joi.string().min(3).required(),
     email: Joi.string().min(6).max(30).required().email(),
     password: Joi.string().min(6).required()
})

router.post('/', async (req,res) => {
     // Validataion   
     const {error} = schema.validate(req.body);
     if (error) return res.status(400).send(error.message);

     
     const emailExist = await User.findOne({ email: req.body.email });
     if (emailExist) return res.status(400).send({success: false,message: 'Email address is taken.'});

     const userNameExist = await User.findOne({ username: req.body.username });
     if (userNameExist) return res.status(402).send('Username is taken');
     
     // Hashing password
     const salt = await bcrypt.genSalt(10);
     const password = await req.body.password;
     const hashedPassword = await bcrypt.hashSync(password, salt);
     
     const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
     });

     // registration
     try{
          const savedUser = await newUser.save();
          res.status(200).send({success: true, user: savedUser});
          console.log(`user: "${req.body.username}" is successfully registered`);
     }catch(err){
          res.status(400).send(err);
     }
})



module.exports = router;