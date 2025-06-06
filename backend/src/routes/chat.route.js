// backend/src/routes/chat.routes.js
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

const chatRoutes = Router();

// Protected API routes
chatRoutes.post("/new", protectRoute, generateChatCompletion);
chatRoutes.get("/all-chats", protectRoute, sendChatsToUser);
chatRoutes.delete("/delete", protectRoute, deleteChats);

export default chatRoutes;