import { Request, Response } from "express";
import database from "../database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await database.users.findAll();
    res.status(200).send({ success: true, users });
  } catch (error: any) {
    res.status(400).send({ success: false });
  }
};
