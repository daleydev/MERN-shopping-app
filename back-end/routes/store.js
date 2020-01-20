const router = require("express").Router();
const auth = require("../security/auth");
const Store = require("../models/Store");
const User = require("../models/User");

router.get("/", async (req, res) => {
  const stores = await Store.find({ public: true });
  res.send(stores);
});

router.post("/create", auth, async (req, res) => {
  const userId = req.body.id;

  const storeExist = await Store.findOne({store_name: req.body.name});
  if (storeExist) return res.status(400).send({success: false, message: 'store name is taken'});
   
  const newStore = new Store({
    store_name: req.body.name,
    owner_id: userId,
    category: req.body.category,
    logo_image: req.body.image
  });

  // create store
  try {
    const savedStore = await newStore.save();
    const user = await User.findByIdAndUpdate({ _id: userId },{'$push': { "stores": newStore}})
    user.save();
    res.send(savedStore);
    console.log(`store: ${req.body.name} is successfully created.`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
