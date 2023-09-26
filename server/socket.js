module.exports = {
    connect: function(io, PORT) {
        io.on("connection", (socket) => {

            let joinedChannel;

            socket.on("joinChannel", (channel, username) => {
                socket.join(channel);
                console.log(`User connection on port ${PORT} : ${socket.id}. Channel: ${channel}`);
                io.to(channel).emit("notification", `${username} has joined the channel.`);
                joinedChannel = channel;
            })

            socket.on("message", (message, username, photo) => {
                io.to(joinedChannel).emit("message", {message, username, photo});
            })

            socket.on("left", (username) => {
                io.to(joinedChannel).emit("notification", `${username} has left the channel.`);
            })
        })
    }
}