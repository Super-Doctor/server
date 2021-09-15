(function connect() {
    let socket = io.connect()
      socket.emit('getAll');
    socket.on('newmssg', payload => {
        

        let listItem = document.createElement('li')
        listItem.textContent =  payload.massage.userName+' : '+payload.massage.message 
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)
    
        console.log(payload.massage.message);
        socket.emit('received', payload.id);
        
    });
    

    let userName = document.querySelector('#userName')
    let userNameBtn = document.querySelector('#userNameBtn')
    let curuserName = document.querySelector('.card-header')

    userNameBtn.addEventListener('click', e => {
        console.log(userName.value)
        socket.emit('change_userName', { userName: userName.value })
        curuserName.textContent = userName.value
        userName.value = ''
    })
  

    let message = document.querySelector('#message')
    let messageBtn = document.querySelector('#messageBtn')
    let messageList = document.querySelector('#message-list')

    messageBtn.addEventListener('click', e => {
        console.log(message.value)
        socket.emit('new_message', { message: message.value, type: 'teacher' })
        message.value = ''
    })

    socket.on('receive_message', data => {
        
            console.log(data)
            let listItem = document.createElement('li')
            listItem.textContent =  data.userName + ': ' + data.message
            listItem.classList.add('list-group-item')
            messageList.appendChild(listItem)
        

    })




    let info = document.querySelector('.info')

    message.addEventListener('keypress', e => {
        socket.emit('typing', { text: message.value })
    })

    socket.on('typing', data => {
        info.textContent = data.userName + " is typing..." + data.text
        setTimeout(() => { info.textContent = '' }, 5000)
    })



    socket.on('typing', data => {
        socket.broadcast.emit('typing', { userName: socket.userName })
    })

})()