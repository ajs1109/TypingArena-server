import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./router/users.js";
import authRoutes from "./router/auth.js";
import { Server } from "socket.io";

const app = express();
app.use(bodyParser.json({ limit: "300mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "300mb" }));
// app.use(express.json())
app.use(cors());

const PORT = process.env.port || 6010;
const CONNECTION_URL =
  "mongodb+srv://ajiteshsr615:Ajitesh601@cluster0.oyphj9d.mongodb.net/?retryWrites=true&w=majority";

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log("Server is listening on port", PORT)
    );
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });
    io.on("connection", (socket) => {
      console.log(`${socket.id} connected`)
      socket.on('joined-room',({id,room}) => {
        socket.join(room);
        console.log(`${id} joined ${room} yo`);
        console.log('create room size ' + io.sockets.adapter.rooms.get(room).size)
         })
      socket.on('check-room',({id,room}) => {
        socket.join(room);
        console.log('check room '+io.sockets.adapter.rooms.get(room).size)
        if(io.sockets.adapter.rooms.get(room).size <= 1){
          socket.leave(room);
          socket.emit('is-right-room',{success:false,message:'invalid room id'})
        }
        else{
          socket.emit('is-right-room',{success:true,message:'welcome'})
        }
     
      })
      socket.on('leave-room',room => {
        socket.leave(room);
      })
    });

    // io.on("disconnection",(socket) => {console.log('socket.io disconnected')});
  })
  .catch((err) => console.log("Error connecting to port"));
