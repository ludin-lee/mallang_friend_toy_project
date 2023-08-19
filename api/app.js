import "./src/config/env.js";
import http from "node:http";
import https from "node:https";
import fs from "fs";
import express from "express";
import cors from "cors";
import logger from "morgan";
import "./src/models/index.js";
import indexRouter from "./src/routes/index.router.js";

const { MF_APP_PORT: PORT, MF_APP_HTTPS_PORT: HTTPSPORT } = process.env;

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

// if (process.env.NODE_ENV == "dev") {
//   // Certificate 인증서 경로
//   const privateKey = fs.readFileSync(
//     "/etc/letsencrypt/live/mallang.site/privkey.pem",
//     "utf8"
//   ); //필수
//   const certificate = fs.readFileSync(
//     "/etc/letsencrypt/live/mallang.site/cert.pem",
//     "utf8"
//   ); //필수
//   const ca = fs.readFileSync(
//     "/etc/letsencrypt/live/mallang.site/chain.pem",
//     "utf8"
//   ); //필수

//   const credentials = {
//     //필수
//     key: privateKey,
//     cert: certificate,
//     ca: ca,
//   };
//   https.createServer(credentials, app).listen(HTTPSPORT, () => {
//     //필수
//     console.log("HTTPS Server running on port 443");
//   });
// } else {
http.createServer(app).listen(PORT || 3000, (err) => {
  console.log("HTTP Server running on port 80");
});
// }
