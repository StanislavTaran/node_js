global.ROOT_PATH = __dirname;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());

app.use(morgan("tiny"));

app.use("/", express.static("public"));

app.use(express.json());

app.listen(3000, () =>
  console.log(`\x1B[34m Server listening on port: 3000 \x1b[0m`)
);
