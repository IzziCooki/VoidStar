import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

export const general = Router();
export const prisma = new PrismaClient();

general.get("/general/usercount", async (req: Request, res: Response) => {
  const usercount = await prisma.$queryRaw(
    "SELECT created_users FROM usercount;"
  );

  res.json(usercount);
});

general.get("/general/requestcount", async (req: Request, res: Response) => {
  const requestcount = await prisma.$queryRaw("SELECT * FROM requestcount");

  res.json(requestcount);
});

module.exports = general;
