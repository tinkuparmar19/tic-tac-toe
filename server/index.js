
const io = require("socket.io")(3032, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3000/join', 'http://localhost:3000/ready'],
    }
})

const users = []

function userJoin(id, username, code) {

    const user = { id, username, code };
  
    users.push(user);
  
    return user;
}

function getRoomUsers(code) {
    return users.filter(user => user.code === code);
}

const getUserData = (id) => {
    return users.filter(user => user.id === id)
}

const getOpponent = (id) => {
    const temp = users.filter(user => user.id !== id)
    return temp[0].id
}


io.on("connection", socket => {
    console.log(socket.id)
    
    socket.on("join-game", ({userName, code}) => {
        const user = userJoin(socket.id, userName, code)
        socket.join(user.code)

        socket.emit('joined', 'you have joined the room')

        socket.broadcast
        .to(user.code)
        .emit('message',`${user.username} has joined the room`);

        io.in(user.code).emit('roomUsers', {
            users: getRoomUsers(user.code),
        });

        socket.on('make-move', ({row, col}) => {
            io.in(user.code).emit('made-move', ({row,col}))
        })
    })
})
