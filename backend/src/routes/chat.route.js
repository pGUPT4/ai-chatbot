// backend/src/routes/chat.routes.js
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteChats, generateChat, getChats, checkEmptyChat  } from "../controllers/chat.controller.js";

const chatRoutes = Router();

// Protected API routes
chatRoutes.post("/create", protectRoute, generateChat);
chatRoutes.get("/all", protectRoute, getChats);
chatRoutes.delete("/delete", protectRoute, deleteChats);
chatRoutes.get("/check-empty", protectRoute, checkEmptyChat);

export default chatRoutes;