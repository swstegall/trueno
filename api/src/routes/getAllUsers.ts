import { Request, Response } from "express";
import database from "../database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const currentUser = await database.users.findOne({
      where: {
        id: req.headers.id,
      },
    });
    if (currentUser !== undefined && currentUser !== null) {
      if (currentUser.admin) {
        const users = await database.users.findAll();
        res.status(200).send({ success: true, users });
      } else {
        const users = await database.users.findAll();
        res.status(200).send({ success: true, users });
      }
    }
  } catch (error: any) {
    res.status(400).send({ success: false });
  }
};
