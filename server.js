require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require("./routes/contacts.router");

const createServer = async () => {
  try {
    const app = express();
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongo Database connection successful!");

    app.all("*", function (req, res, next) {
      const origin = req.get("origin");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      next();
    });

    app.use(cors());

    app.use(morgan("tiny"));

    app.use("/", express.static("public"));

    app.use(express.json());

    app.use("/api/contacts", contactsRouter);

    app.listen(3000, () =>
      console.log(`\x1B[33mServer listening on port: 3000... \x1b[0m`)
    );
  } catch (e) {
    console.log(e);
  }
};

createServer();
