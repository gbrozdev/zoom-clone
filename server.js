/* () $ @ # & %  */

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 5000;

app.set('view engine', 'hbs')
app.use(express.static('public'))



app.get('/', (req, res) => {
    const roomId = '12345678';
    res.redirect(`/${roomId}`)
})

app.get('/:room', (req, res) => {
    res.render('room',{roomId:req.params.room})
})

io.on('connection', socket => {
    console.log('user connected');
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId);
        socket.join(roomId)
        socket.to(roomId).emit('user-connected',userId)
    } )
})

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} `);
})