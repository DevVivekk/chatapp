const express = require('express')
const http = require('http')
const cors = require('cors')
const {Server} = require("socket.io")
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log("socket",socket.id);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log("user joined room",data);
    })
    socket.on("alertjoined",(data)=>{
        console.log("useralert",data);
        io.emit("userjoined",data)
        //io.emit for global sending notification
    })
    socket.on("send_message",(data)=>{
    //console.log(data)
    socket.to(data.room).emit("receive_message",data)
    })
    socket.on("disconnect",()=>{
        console.log("User Disconnected!")
    })
})
server.listen(4000,()=>{
    console.log('Im live')
})
