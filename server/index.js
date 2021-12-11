import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";

import characterRoutes from "./routes/characters.routes.js";
import authRoutes from "./routes/auth.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";

const PORT = process.env.PORT || 8800;
const CONNECTION_URL = process.env.CONNECTION_URL;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/characters", characterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);

app.get("/api", (req, res) => {
  res.send("Welcome to the roll99 APi");
});

io.on("connection", (socket) => {
  console.log(socket.id + "connected");
  socket.on("roomMessage", (messageData) => {
    console.log("called");
    io.to(messageData.roomCode).emit("message", messageData);
  });
  socket.on("joinRoom", (roomCode) => {
    socket.join(roomCode);
  });

  socket.on("leaveRoom", (roomCode) => {
    console.log("left room");
    socket.leave(roomCode);
  });
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
