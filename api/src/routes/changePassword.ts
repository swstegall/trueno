import { Request, Response } from "express";
import database from "../database";
import { generatePassword } from "./login";

export const changePassword = async (req: Request, res: Response) => {
  if (req.body.password === undefined || req.body.password === null) {
    res
      .status(400)
      .send({ success: false, error: "You must specify a new password." });
    return;
  }
  const newPassword = generatePassword(req.body.password);
  const user: any = await database.users.findOne({
    where: {
      username: req.headers.username,
      deletedAt: null,
    },
  });
  const userData = user.dataValues;
  const credential = await database.credentials.findOne({
    where: {
      id: userData.id,
      deletedAt: null,
    },
  });
  try {
    await database.credentials.update(
      {
        password: newPassword,
        updatedAt: new Date().toUTCString(),
      },
      {
        where: {
          id: credential.id,
        },
      }
    );
    res.status(200).send({ success: true });
  } catch (error: any) {
    res.status(500).send({ success: false, error: "Error updating password." });
  }
  return;
};
