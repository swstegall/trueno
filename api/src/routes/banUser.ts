import { Request, Response } from "express";
import database from "../database";

export const banUser = async (req: Request, res: Response) => {
  const currentUser = await database.users.findOne({
    where: {
      id: req.headers.id,
    },
  });
  if (currentUser !== undefined && currentUser !== null) {
    if (currentUser.admin) {
      const targetUser = await database.users.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (targetUser !== undefined && targetUser !== null) {
        await database.users.update(
          {
            deletedAt: new Date().toUTCString(),
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
        res
          .status(200)
          .send({ success: true, message: "The requested user has been banned." });
      } else {
        res.status(500).send({
          success: false,
          message: "The user you are trying to ban does not exist.",
        });
      }
    } else {
      res
        .status(400)
        .send({ success: false, message: "Only admins can ban other users." });
    }
  }
};
