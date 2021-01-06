import express, { Request, Response, NextFunction } from "express";

import consola, { Consola } from "consola";
import cors from "cors";
import * as bodyParser from "body-parser";

import path from "path";
import * as dotENV from "dotenv";

import { PORT } from "./utils/PORT.json";

export class Server {
  public app: express.Application;
  public logger: Consola = consola;

  start() {
    this.setConfig();
    this.setRequestLogger();
    this.setRoutes();

    this.app.listen(PORT, () => {
      this.logger.success(`Server started on port ${PORT}`);
    });
  }

  setConfig() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    dotENV.config();
  }

  setRequestLogger() {
    this.app.use(async (req: Request, res: Response, next: NextFunction) => {
      console.log(`[${req.method} - ${req.path}]`);

      next();
    });
  }

  setRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.sendFile(__dirname + "/frontend/index.html");
    });

    this.app.get("/dashboard", (req: Request, res: Response) => {
      res.sendFile(__dirname + "/frontend/dashboard.html");
    });
    this.app.use(express.static(path.join(__dirname, "frontend")));

    this.app.use(
      "/api/v1",
      require("./api/auth/DiscordAuth"),
      require("./api/auth/GitHubAuth"),
      require("./api/general/General")
    );
  }
}
