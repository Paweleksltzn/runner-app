exports.joinUserRoom = async function (req, res, next) {
    try {
        const io = require('../util/socket').getIO();
        const socket = io.sockets.connected[req.body.socketId];
        if (socket) 
            socket.join(req.token._id);
        return res.json({});
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas wyszukiwania użytkownika');
    }
}
