const ChatServices = require('./modules/chat/chat.service');

const serverSocket = (io) => {
    io.on('connection', (socket) => {

        // join room
        socket.on('join', (data, callback) => {
            socket.join(data.roomId);
            io.to(data.roomId).emit('roomData', 'joineddd');
            // console.log('rommmmmm',io.sockets.adapter.rooms)
            callback();
        });


        // nhận tin nhắn từ client
        socket.on('sendMessage', async (data, callback) => {
            console.log('sendddddd', data, socket.id);
            const con = await ChatServices.saveMessage(data);
            io.to(data.roomId).emit('message', { creator: data.creator, text: data.message, roomId: data.roomId });
            callback();
        });


        socket.on("disconnect", () => {

            console.log("Dissconnet");
        })
    })

}

module.exports = {
    serverSocket,
}