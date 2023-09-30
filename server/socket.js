let history = {};

module.exports = {
    connect: function(io, PORT) {
        io.on("connection", (socket) => {

            let joinedChannel;

            socket.on("joinChannel", (channel, username) => {
                socket.join(channel);
                console.log(`User connection on port ${PORT} : ${socket.id}. Channel: ${channel}`);
                io.to(channel).emit("notification", `${username} has joined the channel.`);
                joinedChannel = channel;

                if (!history[channel]) {
                    history[channel] = [];
                } else {
                    socket.emit("chatHistory", history[channel]);
                }                
            })

            socket.on("newPeerID", (uuid) => {
                io.to(joinedChannel).emit("peerID", uuid);
                console.log("PeerID: " + uuid);
            })

            socket.on("message", (message, username, photo) => {
                history[joinedChannel].push({message, username, photo});

                if (history[joinedChannel].length >= 5) {
                    history[joinedChannel].shift()
                }
                io.to(joinedChannel).emit("message", {message, username, photo});
            })

            socket.on("left", (username) => {
                io.to(joinedChannel).emit("notification", `${username} has left the channel.`);
                socket.disconnect(0);
            })

            socket.on("imageToServer", (file, mimetype, username, photo) => {
                io.to(joinedChannel).emit("imageToClient", {file, mimetype, username, photo});
            })
        })
    }
}