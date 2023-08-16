import { EXPIRES_IN } from "../config/const.js";
import { AuthorizationError } from "../config/errorCode.js";
import jwt from "jsonwebtoken";
import { generatePassword } from "../utils/crypto.js";
import db from "../models/index.js";

const { MF_JWT_SECRET: secretKey } = process.env;
class AuthController {
  getToken = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userInfo = await db.user.findOne({ where: { email } });

      if (!userInfo || userInfo?.password !== generatePassword(password))
        throw new AuthorizationError();

      const token = jwt.sign(
        {
          id: userInfo.id,
          name: userInfo.name,
        },
        secretKey,
        { expiresIn: EXPIRES_IN }
      );

      res.status(200).json({
        result: true,
        data: {
          tokenType: "Bearer",
          expiresIn: EXPIRES_IN,
          token,
        },
      });
    } catch (err) {
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
}
export default AuthController;
