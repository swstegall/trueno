import { Request, Response } from "express";
import database from "../database";

export const newMessage = async (req: Request, res: Response) => {
  const date: string = new Date().toUTCString();
  const { message } = req.body || "";
  const { id } = req.headers || "";
  const newMessage = {
    userId: id,
    message,
    deletedAt: null,
    createdAt: date,
    updatedAt: date,
  };
  try {
    database.messages.create(newMessage);
    res.status(200).send({ success: true });
  } catch (error: any) {
    database.messages.create(newMessage);
    res.status(400).send({ success: false });
  }
};