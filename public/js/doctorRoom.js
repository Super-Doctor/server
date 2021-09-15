(function connect() {
    let socket = io.connect()

    let userID

    let usersList = document.getElementById('subject')
    let userOption
    getUsers()

    async function getUsers() {
        await axios.get('https://gold-team-mid-project.herokuapp.com/alluser').then(data => {
            console.log(data.data);
            data.data.forEach(users => {
                userOption = document.createElement('option')
                userOption.value = users.id
                userOption.textContent = users.name

                usersList.appendChild(userOption)

               
            })
            usersList.onchange = function a() {
                userID = usersList.value
                console.log(userID)
            }
        })
    }
    
    socket.on('newmssg', payload => {


        let listItem = document.createElement('li')
        listItem.textContent = payload.massage.username + ' : ' + payload.massage.message
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)

        console.log(payload.massage.message);
        socket.emit('received', payload.id);
    });




    

    
    let curUsername = document.querySelector('.card-header')




    
    function changeName() {

        console.log(username)
        socket.emit('change_username', { username: username })
        curUsername.textContent = username
        
    }

    //  local storage
    const userStorageData = localStorage.getItem('userData');
    if (userStorageData == null) {
        location.replace("https://gold-team-mid-project.herokuapp.com/")

    }
    const userStorageDataFromJSON = JSON.parse(userStorageData)
    console.log(userStorageDataFromJSON.user)
    username = userStorageDataFromJSON.user.user_name
    let myID = userStorageDataFromJSON.user.id
    changeName()

    let message = document.querySelector('#message')
    let messageBtn = document.querySelector('#messageBtn')
    let messageList = document.querySelector('#message-list')

    messageBtn.addEventListener('click', e => {

        let id = userID



        console.log(message.value)
        socket.emit('new_message', { message: message.value, id: id })
        let listItem = document.createElement('li')
        listItem.textContent = 'Me ' + ' :: ' + message.value
        listItem.classList.add('list-group-item')

        messageList.appendChild(listItem)
        message.value = ''
        console.log(id);
        console.log(myID);

        console.log(typeof id);
        console.log(typeof myID);

    })

    socket.on('receive_message', data => {
        if (myID == data.id) {

            console.log(data)
            let listItem = document.createElement('li')
            listItem.textContent = data.username + ' :: ' + data.message
            listItem.classList.add('list-group-item')

            messageList.appendChild(listItem)
            console.log('---------------');
        }



    })







    let info = document.querySelector('.info')

    message.addEventListener('keypress', e => {
        socket.emit('typing', { text: message.value })
    })

    // socket.on('typing', data => {

    //     info.textContent = data.username + " is typing..." + data.text
    //     setTimeout(() => { info.textContent = '' }, 5000)
    // })



    socket.emit('getAll', myID);

})()