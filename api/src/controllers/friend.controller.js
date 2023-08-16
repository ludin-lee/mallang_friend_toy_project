import { NotFoundError } from "../config/errorCode.js";
import db from "../models/index.js";

class FriendController {
  getFriendList = async (req, res) => {
    const { name } = req.query;
    try {
      const ownerInfo = await db.user.findOne({ where: { name } });

      if (!ownerInfo) throw NotFoundError();

      const friendList = await db.friend.findAll({
        where: { ownerId: ownerInfo.id },
      });

      res.status(200).json({ result: true, data: { friendList } });
    } catch (err) {
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };

  getFriendInfo = async (req, res) => {
    const { friendId } = req.query;
    try {
      const friendInfo = await db.friend.findOne({
        where: { id: friendId },
        include: [
          {
            model: db.pointHistory,
            as: "pointHistories",
          },
        ],
      });

      res.status(200).json({ result: true, data: { friendInfo } });
    } catch (err) {
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };

  createFriend = async (req, res) => {
    const { name } = req.body;
    const { id } = req.locals.decodedToken;

    try {
      const friendInfo = await db.friend.create({ name, ownerId: id });

      res.status(200).json({ result: true, data: { friendInfo } });
    } catch (err) {
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };

  updateFriend = async (req, res) => {
    const { friendId } = req.query;
    const { name } = req.body;
    const { id } = req.locals.decodedToken;

    try {
      await db.friend.update(
        { name },
        { where: { id: friendId, ownerId: id } }
      );

      res.status(200).json({ result: true });
    } catch (err) {
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };

  deleteFriend = async (req, res) => {
    const { id } = req.locals.decodedToken;
    const { friendId } = req.query;
    try {
      await db.friend.destroy({ where: { id: friendId, ownerId: id } });

      res.status(200).json({ result: true });
    } catch (err) {
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
}

export default FriendController;
