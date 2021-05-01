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
  const payload = await database.messages.create(newMessage);
  const response = payload.dataValues;
  try {
    res.status(200).send({ success: true, message: { ...response } });
  } catch (error: any) {
    res.status(400).send({ success: false });
  }
};
