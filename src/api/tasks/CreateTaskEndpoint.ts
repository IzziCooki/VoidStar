import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import { uuid } from "../../utils/uuid";
import {
  title_error,
  description_error,
  category_error,
} from "../errors/Errors";

export const createtask = Router();
export const prisma = new PrismaClient();

createtask.get(
  "/tasks/create/:title/:description/:category",
  async (req: Request, res: Response) => {
    let state: string = "error";

    let generatedTaskID: string = uuid();

    const titleParam: string = req.params.title;
    const descriptionParam: string = req.params.description;
    const categoryParam: string = req.params.category;

    const createdTask = await prisma.tasks.create({
      data: {
        task_id: generatedTaskID,
        task_title: titleParam,
        task_description: descriptionParam,
        task_category: categoryParam,
      },
    });

    if (createdTask) {
      return res.json({
        state: state.replace("error", "success"),
        taskID: generatedTaskID,
        submitted_title: titleParam,
        submitted_description: descriptionParam,
        submitted_category: categoryParam,
      });
    } else if (!createdTask) {
      return res.json({ state: state });
    }

    if (!titleParam) {
      return res.send(JSON.parse(title_error));
    } else if (!descriptionParam) {
      return res.send(JSON.parse(description_error));
    } else if (!categoryParam) {
      return res.send(JSON.parse(category_error));
    }
  }
);
