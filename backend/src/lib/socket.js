import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
})

export function getRecieverSocketId(userId) {
    return userSocketMap[userId]
}


//record of online users
const userSocketMap = {}
//userId: socketId

io.on("connection", (socket) => {
    console.log("a user connected with socketid", socket.id);
    //pass this in client side(see useAuthtore.js line 93)
    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id

    //io.emit() to broadcast events to all the connected users
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    //all the userId of online users

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

export { io, app, server };