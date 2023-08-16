document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://127.0.0.1:3000/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.result) {
        localStorage.setItem("token", data.data.token);
        window.location.href = "manageFriend.html"; // Redirect to manageFriend Page
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed due to an error.");
    }
  });

document
  .getElementById("backButtonLogin")
  .addEventListener("click", function () {
    window.history.back();
  });
