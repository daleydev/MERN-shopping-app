const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
     email: Joi.string().min(6).max(30).required().email(),
     password: Joi.string().min(6).required()
})

router.post('/', async (req,res) => {
    // Validataion   
     const {error} = schema.validate(req.body);
     if (error) return res.status(400).send(error);

     const user = await User.findOne({ email: req.body.email });
     if (!user) return res.status(400).send('User is not found.');

     const validPass = await bcrypt.compare(req.body.password, user.password);
     if (!validPass) return res.status(400).send('Invalid password.')
     
    const token = jwt.sign({_id: user._id}, process.env.JWT_TOKEN);
    res.header('auth-token', token).send({token: token});
    console.log(`Login successfully. Your JWT token is "${token}"`);
})



module.exports = router;