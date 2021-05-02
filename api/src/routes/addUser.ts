import { Request, Response } from "express";
import database from "../database";
import { generatePassword } from "./login";
import { uuidv4 } from "../utilities/uuidv4";

export const addUser = async (req: Request, res: Response) => {
  try {
    const date: string = new Date().toUTCString();
    const userId: string = uuidv4();
    const newUser: any = {
      id: userId,
      username: req.body.username,
      admin: false,
      deletedAt: null,
      createdAt: date,
      updatedAt: date,
    };

    const existingUsers = await database.users.findAll({
      where: {
        deletedAt: null,
      },
      attributes: ["username"],
    });

    const userArray = new Array();
    existingUsers.forEach((element: any) => {
      userArray.push(element);
    });
    let exists: boolean = false;
    userArray.forEach((element) => {
      if (req.body.username === element.username) {
        exists = true;
      }
    });
    if (exists) {
      res
        .status(400)
        .send({ success: false, error: "Username is already in use." });
      return;
    }
    await database.users.create(newUser);
    const newCredential: any = {
      id: userId,
      password: generatePassword(req.body.password as string),
      deletedAt: null,
      createdAt: date,
      updatedAt: date,
    };
    await database.credentials.create(newCredential);
    res.status(200).send({ success: true });
  } catch (error: any) {
    res.status(500).send({ success: false, error: "Internal server error." });
  }
};
