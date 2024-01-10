//mongodb+srv://ajiteshsr615:<password>@cluster0.mik56ue.mongodb.net/?retryWrites=true&w=majority

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { User } from './models/UserModel.js';
import userRoutes from './router/users.js';
import authRoutes from './router/auth.js';

const app = express();
app.use(bodyParser.json({limit:'300mb',extended:true}));
app.use(bodyParser.urlencoded({ extended:true,limit:'300mb' }));
// app.use(express.json())
app.use(cors());

const PORT = 5000;
const CONNECTION_URL = "mongodb+srv://ajiteshsr615:Ajitesh601@cluster0.oyphj9d.mongodb.net/?retryWrites=true&w=majority";

app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);

mongoose.connect(CONNECTION_URL)
.then(()=> {
    const server = app.listen(PORT,() => console.log('Server is listening on port', PORT))
    // const io = new Server(server, {
    //   pingTimeout: 60000,
    //   cors: {
    //     origin: "http://localhost:5173",
    //   },
    // });
    // io.on("connection", (socket) => {
    //   console.log("connected to socket.io");
    //   socket.on("setup",(userData)=> {
    //     console.log(userData._id);
    //     socket.join(userData._id);
    //     socket.emit("connected");
    //   })
    //   socket.on("join chat", room => {
    //     socket.join(room);
    //     console.log("user joined room : ",room);
    //   })
    //     socket.on("typing" , (room) => socket.in(room).emit("typing"))
    //   socket.on("stop typing" , (room) => socket.in(room).emit("stop typing"))
    //   socket.on("new message", (newMessageReceived) => {
    //     var chat = newMessageReceived.chat;
    //     if(!chat.users) return console.log("chat.users is not defined")
    //     chat.users.forEach(user => {
    //         if(user._id === newMessageReceived.sender._id) return;
    //         socket.in(user._id).emit("message received",newMessageReceived);
    //     })
    //   })

    
    // });
})
.catch(err => console.log('Error connecting to port'))

