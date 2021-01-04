const { Router } = require("express");
const request = require("request-promise");

const discord = Router();

discord.get("/auth/discord", (req, res) => {
  res.redirect(
    "https://discord.com/api/oauth2/authorize" +
      "?client_id=" +
      process.env.CLIENT_ID +
      "&redirect_uri=" +
      encodeURIComponent("http://localhost:8080/api/v1/auth/discord/callback") +
      "&response_type=code" +
      "&scope=identify%20email"
  );
});

discord.get("/auth/discord/callback", async (req, res) => {
  let code = req.query.code;

  let accessToken = await request({
    method: "post",
    url: "https://discord.com/api/v8/oauth2/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    form: {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:8080/api/v1/auth/discord/callback",
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

  res.redirect("/");
});

module.exports = {
  discord,
  user,
};
