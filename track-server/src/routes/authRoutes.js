const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("user");

router.post("/signup", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }

  res.send("signup post request");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must Provided email and password" });
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    res.status(404).send({ error: "Email not Found" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
