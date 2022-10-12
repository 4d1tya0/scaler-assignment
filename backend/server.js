//initializes
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

//app
const app = express();

//port
const port = 6400;

//routes
const meetingRoute = require("./routes/meeting");
const participantRoute = require("./routes/participant");
// const cartRoute = require("./routes/cart");
// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");
// const orderRoute = require("./routes/order");

//middleware
app.use(cors());

// app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/", homeRoute);
app.use("/meetings", meetingRoute);
app.use("/participants", participantRoute);
// app.use("/users", userRoute);
// app.use("/auth", authRoute);
// app.use("/orders", orderRoute);

//mongoose //       //mongodb://localhost:27017/ecommerce      //mongodb+srv://omg9800:jagat.786@cluster0.piyzt.mongodb.net/ecommerce
// mongoose.set("useFindAndModify", false);
// mongoose.set("useUnifiedTopology", true);
// useNewUrlParser: true,
// useUnifiedTopology: true,

// mongoose.set("useFindAndModify", false);
// mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(
    "mongodb://localhost:27017/meeting",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("connect");
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
