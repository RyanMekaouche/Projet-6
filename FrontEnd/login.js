
const loginApi = "http://localhost:5678/api/users/login";

document.getElementById("login-form").addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  let user = {
    email: document.getElementById("email-input").value,
    password: document.getElementById("password-input").value,
  };

  let response = await fetch(loginApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  });
  console.log(response);
  if (response.status !== 200) {
    alert("Email ou mot de passe erronés");
  } else {
    let result = await response.json();
    const token = result.token;
    sessionStorage.setItem("authToken", token)
    window.location.replace("./index.html");
  }
};
