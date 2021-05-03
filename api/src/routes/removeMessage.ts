import { Request, Response } from "express";
import database from "../database";

export const removeMessage = async (req: Request, res: Response) => {
  const currentUser = await database.users.findOne({
    where: {
      id: req.headers.id,
    },
  });
  if (currentUser !== undefined && currentUser !== null) {
    if (currentUser.admin) {
      const targetMessage = await database.messages.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (targetMessage !== undefined && targetMessage !== null) {
        await database.messages.update(
          {
            deletedAt: new Date().toUTCString(),
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
        res.status(200).send({
          success: true,
          message: "The requested message has been removed.",
        });
      } else {
        res.status(500).send({
          success: false,
          message: "The message you are trying to remove does not exist.",
        });
      }
    } else {
      res
        .status(400)
        .send({ success: false, message: "Only admins can remove messages." });
    }
  }
};
