module.exports = {
    connect: function(io, PORT) {
        io.on("connection", (socket) => {

            let joinedChannel;

            socket.on("joinChannel", (channel) => {
                socket.join(channel);
                console.log(`User connection on port ${PORT} : ${socket.id}. Channel: ${channel}`);
                joinedChannel = channel;
            })

            socket.on("message", (message, username, photo) => {
                io.to(joinedChannel).emit("message", {message, username, photo});
            })
        })
    }
}