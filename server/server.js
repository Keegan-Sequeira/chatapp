const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io") (http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

const sockets = require("./socket.js");
const server = require("./listen.js");

const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

sockets.connect(io, PORT);

server.listen(http, PORT);

app.post("/api/auth/login", require("./routes/postLogin"));

app.get("/hello", function(req, res){
    res.send("test");
});