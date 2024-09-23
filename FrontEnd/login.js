const email = document.querySelector("form #email-input");
const password = document.querySelector("form #password-input");
const form = document.querySelector("form");

// fonction qui recupere les users

async function getUsers() {
    const response = await fetch("http://localhost:5678/api/users/login");
    return await response.json();
  }
  
