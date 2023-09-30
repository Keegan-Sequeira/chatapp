const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http").Server(app);
const {MongoClient} = require("mongodb");
const {PeerServer} = require("peer");
const io = require("socket.io") (http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e8
});

PeerServer({
    port: 3001,
    path: "/"
})

console.log("Starting Peer server at: 3001");

const sockets = require("./socket.js");
const server = require("./listen.js");

const PORT = 3000;
const URL = "mongodb+srv://keegan:NzUmU87BjOlvF33f@cluster0.mpot7zv.mongodb.net/?retryWrites=true&w=majority";
const dbName = "chatapp";

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

const client = new MongoClient(URL, {});

(async () => {
    try {
        await client.connect();
        console.log("Connected to Mongodb");

        app.set("mongoClient", client);
        sockets.connect(io, PORT);
        server.listen(http, PORT);

        app.use('/images',express.static(path.join(__dirname , './uploadedImages')));

        app.post("/api/auth/login", require("./routes/postLogin"));

        app.post("/api/signup", require("./routes/signup"));
        
        app.post("/api/user/info", require("./routes/userinfo"));
        
        app.post("/api/user/groups", require("./routes/usergroups"));
        
        app.post("/api/groups/create", require("./routes/newgroup"));
        
        app.post("/api/groups/info", require("./routes/groupinfo"));
        
        app.post("/api/groups/channel/create", require("./routes/createchannel"));
        
        app.post("/api/groups/channel/delete", require("./routes/deletechannel")); 
        
        app.get("/api/user/list", require("./routes/allusers"));
        
        app.post("/api/user/promote", require("./routes/promote"));

        app.post("/api/user/demote", require("./routes/demote"));
        
        app.post("/api/groups/getusers", require("./routes/groupusers"));
        
        app.post("/api/groups/removeuser", require("./routes/groupremoveuser"));
        
        app.post("/api/groups/adduser", require("./routes/groupadduser"));
        
        app.post("/api/image/upload", require("./routes/imgupload"));

    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
})();





