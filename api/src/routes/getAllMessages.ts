import { Request, Response } from "express";
import database from "../database";

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await database.messages.findAll();
    res.status(200).send({ success: true, messages });
  } catch (error: any) {
    res.status(400).send({ success: false });
  }
};
