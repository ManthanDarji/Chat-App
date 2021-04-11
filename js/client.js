
const socket = io('http://localhost:8000');

//Get DOM element in respective Js variables 
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

//Audio which will play while message receive or sent.
var audio = new Audio('Ting.mp3')

//Function  Which will append event info to the container 
const append = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }
}

//Ask  New user his/her name 
const name = prompt('Enter your name to join');
socket.emit('new-user-joined' , name);

//If the user joined receive his/her name  from the server!
socket.on('user-joined' , name =>{
    append(`${name} joined the chat`, 'left');
})

//If the server send message, receive it.
socket.on('receive' , data =>{
    append(`${data.name}:${data.message}`, 'left');
})

//If the user leave the chat, append the info to the container
socket.on('left' , name =>{
    append(`${name} left the chat` , 'left');
})

//If form gets submitted, send server the message.
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}` , 'right');
    socket.emit('send' , message);
    messageInput.value = '';

})