const http = require('http');
const express = require("express");
const socketio = require("socket.io");
const dns = require("dns");

dns.lookup("facebook.com", (err, value)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log(value)
})

const app = express();

const clientPath =__dirname+'/../client';
console.log("serving static from "+clientPath);

app.use(express.static(clientPath))

const server = http.createServer(app);

const io = socketio(server);

let players = {}
let player_number=0
io.on("connection", (sock)=>{
    console.log("someone connected")
    players[sock.id]={
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        speed: 10,
        playerId: sock.id,
        nbr: player_number
    };
    player_number+=1;
    sock.emit("current_players", players)
    sock.emit("player_attrib", players[sock.id])
    sock.broadcast.emit("new_player",  players[sock.id])
    sock.on("new_coord", player_moved=>{
        players[sock.id]=player_moved
        sock.broadcast.emit("new_coord", player_moved)
    });
    sock.on("disconnect", ()=>{
        console.log("someone disconnected")
        sock.broadcast.emit("deco", players[sock.id])
        delete players[sock.id]
    })

})


server.on("error", (err)=>{
   console.error("server error:", err)
});

server.listen(8080, ()=>{
    console.log("prog started on 8080")
})
