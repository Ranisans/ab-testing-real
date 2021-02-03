import express from "express";
import bodyParser from "body-parser";
import path from "path";

import getConnection from "./db/connection";

const buildDir = path.join(`${process.cwd()}/build`);
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildDir));

// try to connect to DB
getConnection();

app.get("/*", (req, res) => {
  res.sendFile(path.join(buildDir, "index.html"));
});

const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
