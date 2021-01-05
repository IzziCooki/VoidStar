const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const general = Router();
const prisma = new PrismaClient();

general.get("/general/usercount", async (req, res) => {
  const usercount = await prisma.$queryRaw(
    "SELECT created_users FROM usercount;"
  );

  res.json(usercount);
});

general.get("/general/requestcount", async (req, res) => {
  const requestcount = await prisma.$queryRaw("SELECT * FROM requestcount");

  res.json(requestcount);
});

module.exports = general;
