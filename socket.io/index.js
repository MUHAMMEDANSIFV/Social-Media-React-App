const io = require('socket.io')(8000,{
    cors:{
        origin:'http://localhost:3000'
    }
})

let activeUser = [];

io.on('connection', (socket) => {

    socket.on('new-user-add',(newUserId) => {
        if(!activeUser.some((user) => user.userId === newUserId)){
            activeUser.push({
                userId:newUserId,
                socketId:socket.id
            })
        }
        console.log("Connected User",activeUser)
        io.emit('get-users',activeUser)
    })

    socket.on('disconnect',() => {
        activeUser = activeUser.filter((user) => user.socketId !== socket.id)
        console.log("User disconnected",activeUser)
        io.emit('get-users',activeUser)
    })
})
