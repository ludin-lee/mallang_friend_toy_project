import express from "express";
import PointController from "../controllers/point.controller.js";
import Authorizer from "../middlewares/authorizer.js";
const router = express.Router();
const pointController = new PointController();
const authorizer = new Authorizer();

//GIVE_POINT
router.post("/give", authorizer.checkToken, pointController.givePoint);

export default router;
