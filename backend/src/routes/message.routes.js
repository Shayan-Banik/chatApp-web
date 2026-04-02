import {Router} from "express"
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUser, sendMessage } from "../controllers/messages.controller.js";

const router = Router()

router.get("/users", protectedRoute, getUser)
router.get("/users/:id", protectedRoute, getMessages)

router.post("/send/:id", protectedRoute, sendMessage)

export default router