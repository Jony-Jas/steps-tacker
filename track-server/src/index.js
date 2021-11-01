require("./models/Track");
require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const trackRoutes = require("./routes/trackRoutes");

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

const MONGO_URI = <URL>;
mongoose.connect(MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo Instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
