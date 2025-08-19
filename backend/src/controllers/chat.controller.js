import { findChatsByUserId, createChat, deleteChatsByUserId, isEmptyChat } from "../models/user.model.js";
import { configureOpenAI } from "../lib/openai-config.js";
import { OpenAIApi } from "openai";

export const generateChat = async (req, res) => {
  const { message } = req.body;
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    // create a chat query
    const chats = (await findChatsByUserId(user.id)).map(({ role, message }) => ({
      role,
      content : message,
    }));

    const userMessage = { content: message, role: 'user' };
    chats.push(userMessage);

    // insert that chat qeury
    await createChat({
      user_id: user.id,
      role: userMessage.role,
      message: userMessage.content,
    });

    // put that chat query for chatbot
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // get that chatResponse and put it in the database
    const aiMessage = chatResponse.data.choices[0].message;
    await createChat({
      user_id: user.id,
      role: aiMessage.role,
      message: aiMessage.content,
    });

    const updatedChats = await findChatsByUserId(user.id);
    return res.status(200).json({ chats: updatedChats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getChats = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }
    if (user.id !== req.user.id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    const chats = await findChatsByUserId(user.id);
    return res.status(200).json({ message: "OK", chats });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }
    if (user.id !== req.user.id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    await deleteChatsByUserId(user.id);
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "ERROR", cause: error.message });
  }
};

export const checkEmptyChat = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }
    if (user.id !== req.user.id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    
    const isDeleted = await isEmptyChat(user.id);
    return res.status(200).json({ isDeleted });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", cause: error.message });
  }
}