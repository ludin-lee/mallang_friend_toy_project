import "./src/config/env.js";
import http from "node:http";
import express from "express";
import cors from "cors";
import logger from "morgan";
import "./src/models/index.js";
import indexRouter from "./src/routes/index.router.js";

const { MAKERS_APP_PORT: PORT } = process.env;

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("statics"));
app.use("/api", indexRouter);

app.use((req, res, next) => {
  res.status(404).json({ code: 1, message: "Not found" });
});

const listener = http.createServer(app).listen(PORT || 3000, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(
    "Listening on port " +
      listener.address().port +
      " (" +
      "instance " +
      process.env.PM2_INSTANCE_ID +
      ")"
  );
});
