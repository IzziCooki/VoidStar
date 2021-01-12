//Import Routes
import { discord as DiscordOAuthEndpoint } from "./api/auth/DiscordOAuthEndpoint";
import { github as GitHubOAuthEndpoint } from "./api/auth/GitHubOAuthEndpoint";
import { general as GeneralEndpoints } from "./api/general/GeneralEndpoints";
import { createtask as CreateTaskEndpoint } from "./api/tasks/CreateTaskEndpoint";

import express, { Request, Response, NextFunction } from "express";

import consola, { Consola } from "consola";
import cors from "cors";
import * as bodyParser from "body-parser";

import path from "path";
import * as dotENV from "dotenv";

//Middlewares
import { isAuthenticated } from "./api/middlewares/isAuthenticated";

import { PORT } from "./utils/PORT.json";

export class Server {
  public app: express.Application;
  public logger: Consola = consola;

  public constructor() {
    this.app = express();

    this.setConfig();
    this.setRequestLogger();
    this.setRoutes();
  }

  public start() {
    this.setConfig();
    this.setRequestLogger();
    this.setRoutes();

    this.app.listen(PORT, () => {
      this.logger.success(`Server started on port ${PORT}`);
    });
  }

  private setConfig() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    dotENV.config();
  }

  private setRequestLogger() {
    this.app.use(async (req: Request, res: Response, next: NextFunction) => {
      console.log(`[${req.method} - ${req.path}]`);

      next();
    });
  }

  private setRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.sendFile(__dirname + "/frontend/index.html");
    });

    this.app.get("/about", (req: Request, res: Response) => {
      res.sendFile(__dirname + "/frontend/views/about.html");
    });

    this.app.get("/quickstart", (req: Request, res: Response) => {
      res.sendFile(__dirname + "/frontend/views/get-started.html");
    });

    this.app.get(
      "/dashboard",
      isAuthenticated,
      (req: Request, res: Response) => {}
    );

    this.app.use(express.static(path.join(__dirname, "frontend")));

    this.app.use(
      "/api/v1",
      DiscordOAuthEndpoint,
      GitHubOAuthEndpoint,
      GeneralEndpoints,
      CreateTaskEndpoint
    );
  }
}
