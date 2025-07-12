// backend/src/routes/chat.routes.js
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { chatCheckAuth, deleteChats, generateChat, getChats } from "../controllers/chat.controller.js";

const chatRoutes = Router();

// Protected API routes
chatRoutes.post("/create", protectRoute, generateChat);
chatRoutes.get("/all", protectRoute, getChats);
chatRoutes.delete("/delete", protectRoute, deleteChats);

export default chatRoutes;