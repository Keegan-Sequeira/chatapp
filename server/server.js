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

app.post("/api/signup", require("./routes/signup"));

app.post("/api/user/info", require("./routes/userinfo"));

app.post("/api/groups/user", require("./routes/usergroups"));

app.post("/api/groups/create", require("./routes/newgroup"));

app.post("/api/groups/info", require("./routes/groupinfo"));

app.post("/api/groups/channel/create", require("./routes/createchannel"));