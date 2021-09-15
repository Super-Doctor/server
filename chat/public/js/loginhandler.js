'use strict';

let logInForm = document.getElementById("logInForm");
let logInformdiv = document.getElementById("logInFormdiv");
let video  = document.getElementById("video");
let chat = document.getElementById("chat");
// let socket = io( '/stream' );




logInForm.addEventListener("submit" , (e)=>{
    e.preventDefault();

    let roleList = document.getElementById("role")
    let userName = e.target.userName.value;
    let password = e.target.password.value;
    let role = roleList.value;



    signInFunction(userName, password,role);

    logInformdiv.setAttribute("hidden",1);
    chat.removeAttribute("hidden");


    
})



async function signInFunction(userName, password,role) {
    // Send a GET request with the authorization header set to
    let uri = `http://localhost:3001/signin/${role}`;
  
    let h = new Headers();
    h.append(userName, password);
    console.log(h);
    let encoded = window.btoa(`${userName}:${password}`);
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
          alert("Invalid login");
          throw new Error("BAD HTTP stuff");
        }
      })
      .then((jsonData) => {
        console.log(jsonData);
        let storageData = JSON.stringify(jsonData);
  
        localStorage.setItem("userData", storageData);
        // location.replace(
        //   "https://gold-team-mid-project.herokuapp.com/userChatPage"
        // );
      })
      .catch((err) => {
        console.log( err);
      });
  }

