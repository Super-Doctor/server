"use strict";

localStorage.clear();

const logIn = document.getElementById("logInForm");
const userRole = document.querySelector("#role");

logIn.addEventListener("submit", logInFunction);



async function logInFunction(event) {
  event.preventDefault();

  let userPassword = event.target.userPassword.value;
  let email = event.target.email.value;
 let role = userRole.value;

  console.log(`email = ${email} + password = ${userPassword}`);
  let userData = {
    user_name: email,
    user_password: userPassword,
  };

  
  signInFunction(email, userPassword,role);
}

//https://super-doctors.herokuapp.com/
async function signInFunction(email, userPassword,role) {

  // Send a GET request with the authorization header set to
  let uri = `https://super-doctors.herokuapp.com/signin`;

  let h = new Headers();
  h.append(email, userPassword);
  let encoded = window.btoa(`${email}@gmail.com:${userPassword}`);
  let auth = "Basic " + encoded;
  h.append("Authorization", auth);
  console.log('auth----->',auth);

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
        
        throw new Error("Invalid Login");
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
        text: 'Invalid email or Password or',
      })
    });
}


