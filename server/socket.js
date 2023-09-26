module.exports = {
    connect: function(io, PORT) {
        io.on("connection", (socket) => {
            console.log(`User connection on port ${PORT} : ${socket.id}`);

            socket.on("message", (message, username, photo) => {
                io.emit("message", {message, username, photo});
            })
        })
    }
}