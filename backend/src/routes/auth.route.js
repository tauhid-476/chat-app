import { checkAuth, login, logout, register, updateProfile } from "../controllers/auth.controller.js";
import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.put("/update-profile", protectRoute, updateProfile)

router.get("/checkAuth",protectRoute, checkAuth)


export default  router