//Node sever which will handle the socket.io connections
// const io = require('socket.io')(8000);

const io = require("socket.io")(8000, {
    cors: {
      origin:'*'
    }
  });

const users = {}; 

io.on('connection' , socket =>{

    //If any new user joins, tell server to tell other connected user know!
    socket.on('new-user-joined' , name =>{
        console.log('New user' , name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });


    //If someone sends a message, broadcast it to other people.
    socket.on('send', message =>{
        socket.broadcast.emit('receive' , {message: message , name: users[socket.id]})
    });
    
    //If the some one leave the chat, let the other user know!
    //Here disconnect is in-built method.
    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})