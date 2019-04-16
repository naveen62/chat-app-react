require('./db/mongoose');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
var chatId 
const {
    Chat
} = require('./models/chat')
const {
    genMsg
} = require('./middleware/utils')

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "*")
    next();
});
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

io.on('connection', (socket) => {
    socket.on('join', (join) => {
        chatId = join.joinId;
        socket.join(join.joinId);
    })
    socket.on('msg', async (msg) => {
        try {
            const chat = await Chat.findByIdAndUpdate(msg.id, {
                $push: {
                    chat: genMsg(msg.from, msg.text)
                }
            })
            console.log('msg ',msg.unique)
            io.to(msg.unique).emit('createMsg', genMsg(msg.from, msg.text))
        } catch (e) {

        }
    })
    socket.on('type', (key) => { 
        if(key.show) {
            socket.broadcast.to(key.id).emit('type-show', {show:true});
        } else {
            socket.broadcast.to(key.id).emit('type-show',{show:false});
        }
    })
})

server.listen(3005, () => {
    console.log('app is running')
})