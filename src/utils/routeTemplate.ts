//Route template
import { Router, Request, Response, NextFunction } from "express";

export const routename = Router();

routename.get("/route", (req: Request, res: Response) => {
  res.send("stuff");
});
