const router = require("express").Router();
const auth = require("./auth");
const Store = require("../models/Store");
const User = require("../models/User");

router.get("/", async (req, res) => {
  const stores = await Store.find({ public: true });
  res.send(stores);
});

router.post("/create", auth, async (req, res) => {
  const currentUserId = req.user._id;
  const newStore = new Store({
    name: req.body.name,
    owner_id: currentUserId
  });

  // create store
  try {
    const savedStore = await newStore.save();
    const user = await User.findByIdAndUpdate({ _id: currentUserId },{'$push': { "stores": newStore}})
    user.save();
    res.send(savedStore);
    console.log(`store: ${req.body.name} is successfully registered`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
