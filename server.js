const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://shapeShiftDB:mukulbhai16@cluster0.vmp43iw.mongodb.net/SHAPESHIFT_OFFICIAL"
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });

const authentication = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  pass: {
    type: String,
    require: true,
  },
});

const auth = mongoose.model("auth", authentication);

app.post("/signup", async (req, res) => {
  try {
    const data = new auth({
      name: req.body.username,
      email: req.body.email,
      pass: req.body.password,
    });
    // console.log(data.username);
    // console.log(data);
    await data.save();
  } catch (err) {
    console.log(err);
  }
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", async (req, res) => {
  try {
    const check = await auth.findOne({ email: req.body.email });
    if (check.pass === req.body.password) {
      res.send("Congratullations!!!!!!!!");
    } else {
      res.send("incorrect password");
    }
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.listen(8080, () => {
  console.log("connect to server");
});
