import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

//getusers , getMessages

router.get("/users",protectRoute, getUsersForSidebar);
router.get("/:id",protectRoute, getMessages)

//the userId to whom message is sent
router.post("/send/:id",protectRoute, sendMessage);


export default router