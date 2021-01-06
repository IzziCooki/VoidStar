import { Router, Request, Response, NextFunction } from "express";
import request from "request-promise";

import { PORT } from "../../utils/PORT.json";

export const discord = Router();

discord.get("/auth/discord", (req: Request, res: Response) => {
  res.redirect(
    "https://discord.com/api/oauth2/authorize" +
      "?client_id=" +
      process.env.D_CLIENT_ID +
      "&redirect_uri=" +
      encodeURIComponent(
        `http://localhost:${PORT}/api/v1/auth/discord/callback`
      ) +
      "&response_type=code" +
      "&scope=identify%20email"
  );
});

discord.get("/auth/discord/callback", async (req: Request, res: Response) => {
  let code = req.query.code;

  let accessToken = await request({
    method: "post",
    url: "https://discord.com/api/v8/oauth2/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    form: {
      code,
      client_id: process.env.D_CLIENT_ID,
      client_secret: process.env.D_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: `http://localhost:${PORT}/api/v1/auth/discord/callback`,
      scope: "identify email",
    },
    json: true,
    simple: true,
  });

  let user = await request({
    method: "get",
    url: "https://discord.com/api/v8/users/@me",
    headers: {
      Authorization: "Bearer " + accessToken.access_token,
    },
    json: true,
    simple: true,
  });

  res.redirect("/dashboard");
});
