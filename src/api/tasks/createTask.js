const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const { uuid } = require("../../utils/uuid");
const {
  title_error,
  description_error,
  category_error,
} = require("../errors/errors");

const createtask = Router();
const prisma = new PrismaClient();

createtask.get(
  "/tasks/create/:title/:description/:category",
  async (req, res) => {
    let state = "error";

    let generatedTaskID = uuid();

    const titleParam = req.params.title;
    const descriptionParam = req.params.description;
    const categoryParam = req.params.category;

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
    trin;
    if (
      !typeof categoryParam === "string" ||
      !typeof titleParam === "string" ||
      !typeof descriptionParam === "string"
    ) {
      return res.json({ error: "This parameter must be of type string!" });
    }
  }
);

module.exports = createtask;
