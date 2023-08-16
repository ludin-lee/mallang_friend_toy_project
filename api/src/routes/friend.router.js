import express from "express";
import FriendController from "../controllers/friend.controller.js";
import Authorizer from "../middlewares/authorizer.js";
const router = express.Router();
const friendController = new FriendController();
const authorizer = new Authorizer();

//SHOW FRIEND ALL
router.get("/list", friendController.getFriendList);

//SHOW FRIEND DETAIL
router.get("/info", friendController.getFriendInfo);

//CREATE_FRIEND
router.post("/", authorizer.checkToken, friendController.createFriend);

//UPDATE_FRIEND
router.put("/", authorizer.checkToken, friendController.updateFriend);

//DELETE_FRIEND
router.delete("/", authorizer.checkToken, friendController.deleteFriend);

export default router;
