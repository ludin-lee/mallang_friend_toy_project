import "./env.js";
import db from "../models/index.js";

await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

await db.friend.sync({ alter: true });
await db.pointHistory.sync({ alter: true });
await db.user.sync({ alter: true });

await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
await db.sequelize.close();
