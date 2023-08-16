import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();
const authController = new AuthController();

//GET_TOKEN
router.post("/token", authController.getToken);

export default router;
