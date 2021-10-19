(function connect() {

    let socket = io.connect()

    let userID

    let usersList = document.getElementById('subject')
    let videocall = document.getElementById('videocall');
    let title = document.getElementById("title");
    let avilableUsers = document.getElementById("avilable");
    let userOption
     // //  local storage
     const userStorageData = localStorage.getItem('userData');
     if (userStorageData == null) {
         location.replace("https://super-doctors.herokuapp.com/")
 
     }
     const userStorageDataFromJSON = JSON.parse(userStorageData)
     console.log(userStorageDataFromJSON.user)
     userName = userStorageDataFromJSON.user.userName
     let myID = userStorageDataFromJSON.user.id
     let role = userStorageDataFromJSON.user.roleId
     console.log(role);
    getUsers()


    async function getUsers() {
        if(role == 2) {
            title.innerHTML = "Doctor View"
            avilableUsers.innerHTML = " Avilable Patient "
            await axios.get('https://super-doctors.herokuapp.com/allpatients').then(data => {
                console.log(data.data);
                data.data.forEach(users => {
                    userOption = document.createElement('option')
                    userOption.value = users.id
                    userOption.textContent = users.userName
    
                    usersList.appendChild(userOption)
    
                   
                })
                usersList.onchange = function a() {
                    userID = usersList.value
                    console.log(userID)
                }
            })
        } else {
            title.innerHTML = "Patient View"
            avilableUsers.innerHTML = " Avilable Doctor "

            await axios.get('https://super-doctors.herokuapp.com/alldoctors').then(data => {
                console.log(data.data);
                data.data.forEach(users => {
                    userOption = document.createElement('option')
                    userOption.value = users.id
                    userOption.textContent = users.userName
    
                    usersList.appendChild(userOption)
    
                   
                })
                usersList.onchange = function a() {
                    userID = usersList.value
                    console.log(userID)
                }
            })
        }
        
    }
    
    socket.on('newmssg', payload => {


        let listItem = document.createElement('li')
        listItem.textContent = payload.massage.userName + ' : ' + payload.massage.message
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)

        console.log(payload.massage.message);
        socket.emit('received', payload.id);
    });




    

    
    let curuserName = document.querySelector('.card-header')




    
    function changeName() {

        console.log(userName)
        socket.emit('change_userName', { userName: userName })
        curuserName.textContent = userName
        
    }

   
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

    videocall.addEventListener('click', () => {

        let id = userID



        
        socket.emit('new_message', { message: "https://hema-video-chat.herokuapp.com/?room=hospital_1", id: id })
        let listItem = document.createElement('a')
        listItem.setAttribute("href", "https://hema-video-chat.herokuapp.com/?room=hospital_1");
        listItem.textContent = "Me"+ " :: "+" Click Here To Join "
        listItem.classList.add('list-group-item')

        messageList.appendChild(listItem)
       
      

    })

    socket.on('receive_message', data => {
        if (myID == data.id) {

          if (data.message == "https://hema-video-chat.herokuapp.com/?room=hospital_1") {
            let listItem = document.createElement('a')
            listItem.setAttribute("href", "https://hema-video-chat.herokuapp.com/?room=hospital_1");
            listItem.textContent = data.userName + ' :: '+"Click Here To Join "
            listItem.classList.add('list-group-item')

            messageList.appendChild(listItem)
          }
          else {
            let listItem = document.createElement('li')
            listItem.textContent = data.userName + ' :: ' + data.message
            listItem.classList.add('list-group-item')

            messageList.appendChild(listItem)
          }
       
        }



    })







    let info = document.querySelector('.info')

    message.addEventListener('keypress', e => {
        socket.emit('typing', { text: message.value })
    })

    // socket.on('typing', data => {

    //     info.textContent = data.userName + " is typing..." + data.text
    //     setTimeout(() => { info.textContent = '' }, 5000)
    // })



    socket.emit('getAll', myID);

})()