const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(30)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});

router.post("/", async (req, res) => {
  // Validataion
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({ success: false, message: "User is not found." });
  if (!user.password)
    return res
      .status(400)
      .send({ success: false, message: "Password is not found" });

  const password = await req.body.password;
  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid password." });
  } else {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "15m"
    });

    res.header("auth-token", token).send({ success: true, message: 'login successful', userId: user._id, token:token });
    console.log(
      `user: "${user.username}" Login successfully, the JWT token is "${token}"`
    );
  }

});

module.exports = router;
