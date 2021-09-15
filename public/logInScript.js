"use strict";

localStorage.clear();

const logIn = document.getElementById("logInForm");
const userRole = document.querySelector("#role");

logIn.addEventListener("submit", logInFunction);



async function logInFunction(event) {
  event.preventDefault();

  let userPassword = event.target.userPassword.value;
  let userName = event.target.userName.value;
 let role = userRole.value;

  console.log(`name = ${userName} + pass = ${userPassword}`);
  let userData = {
    user_name: userName,
    user_password: userPassword,
  };

  
  signInFunction(userName, userPassword,role);
}

//https://super-doctors.herokuapp.com/
async function signInFunction(userName, userPassword,role) {

  // Send a GET request with the authorization header set to
  let uri = `https://super-doctors.herokuapp.com/signin/${role}`;

  let h = new Headers();
  h.append(userName, userPassword);
  let encoded = window.btoa(`${userName}:${userPassword}`);
  let auth = "Basic " + encoded;
  h.append("Authorization", auth);
  // console.log(auth);

  let req = new Request(uri, {
    method: "GET",
    headers: h,
  });
  //credentials: 'same-origin'

  fetch(req)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        
        throw new Error("BAD HTTP stuff");
      }
    })
    .then((jsonData) => {
      console.log(jsonData);
      let storageData = JSON.stringify(jsonData);

      localStorage.setItem("userData", storageData);
    
      
        location.replace(
            "https://super-doctors.herokuapp.com/ChatPage"
          );
      
    
    })
    .catch((err) => {
      console.log("ERROR:", err.message);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid userName or Password',
        footer: err.message,
      })
    });
}


