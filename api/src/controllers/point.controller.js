import db from "../models/index.js";

class PointController {
  givePoint = async (req, res) => {
    const { friendId } = req.query;
    const { point, reason } = req.body;

    try {
      const pointInfo = await db.pointHistory.create({
        friendId,
        point,
        reason,
      });

      await db.friend.increment({ point }, { where: { id: friendId } });

      res.status(200).json({ result: true, data: { pointInfo } });
    } catch (err) {
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
}
export default PointController;
