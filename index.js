global.ROOT_PATH = __dirname;
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require(path.join(
  ROOT_PATH,
  "routes",
  "contacts.router"
));

const app = express();

app.use(cors());

app.use(morgan("tiny"));

app.use("/", express.static("public"));

app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.listen(3000, () =>
  console.log(`\x1B[33m Server listening on port: 3000 \x1b[0m`)
);
