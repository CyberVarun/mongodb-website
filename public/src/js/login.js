// Function to send data to server
async function sendData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", // Method to send data
    headers: {
      "Content-Type": "application/json", // Type of data to send
    },
    body: JSON.stringify(data), // Data to send
  });
  return await response.text(); // Get response from server in text (200/404) and return it.
}

const btn = document.getElementById("button"); // Get button element

btn.addEventListener("click", (e) => {
  e.preventDefault(); // To prevent page from reloading

  const email_value = document.getElementById("email").value; // Get email value
  const password_value = document.getElementById("pass").value; // Get password value

  function status_msg(msg) {
    const element = document.getElementById("msg"); // Get element to show status
    element.innerHTML = msg; // Set status
  }

  sendData("https://mongodbsite-varunjagtap424.koyeb.app/cred", {
    email: email_value,
    password: password_value,
  }).then((result) => {
    if (result == "200") {
      status_msg("Login successful"); // If result is 200 then login is successful
    } else if (result == "404") {
      status_msg("Login unsuccessful"); // If result is 404 then login is unsuccessful
    } else {
      status_msg("Promise Pending"); // If result is pending then promise is pending
    }
  });
});
