import express from "express";
import { createAction, deleteAction, getAllActions, updateAction } from "../controllers/actionController.js";

const actionRouter = express.Router();

actionRouter.get("/", getAllActions);
actionRouter.post("/", createAction);
actionRouter.put("/:id", updateAction);
actionRouter.delete("/:id", deleteAction);

export default actionRouter;
