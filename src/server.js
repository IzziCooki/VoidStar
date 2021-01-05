const express = require("express");
const rateLimit = require("express-rate-limit");

const consola = require("consola");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const { PORT } = require("./utils/PORT.json");
const { runInThisContext } = require("vm");

class Server {
  constructor() {
    this.app = express();
  }

  start() {
    this.setConfig();
    this.setRequestLogger();
    this.setRoutes();
    this.setRateLimiter();

    this.app.listen(PORT, () => {
      consola.success(`Server started on port ${PORT}`);
    });
  }

  setConfig() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    require("dotenv").config();
  }

  setRequestLogger() {
    this.app.use(async (req, res, next) => {
      console.log(`[${req.method} - ${req.path}]`);

      next();
    });
  }

  setRateLimiter() {
    const authLimiter = rateLimit({
      windowMs: 60000,
      max: 5,
    });

    this.app.use("/api/v1/auth/discord", authLimiter);
  }

  setRoutes() {
    this.app.get("/", (req, res) => {
      res.sendFile(__dirname + "/frontend/index.html");
    });

    this.app.get("/dashboard", (req, res) => {
      res.sendFile(__dirname + "/frontend/dashboard.html");
    });
    this.app.use(express.static(path.join(__dirname, "frontend")));

    this.app.use("/api/v1", require("./api/auth/DiscordAuth"));
  }
}

module.exports = { Server };
