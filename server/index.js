import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import characterRoutes from "./routes/characters.routes.js";
import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/characters", characterRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello to the roll99 APi");
});

io.on("connection", (socket) => {
  console.log(`connection ${socket.id.substr(0, 4)}`);

  socket.on("toServer", (message) => {
    const mssageObject = { text: message, id: socket.id };
    io.emit("toClient", mssageObject);
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
