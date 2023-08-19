document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("https://mallang.site/api/auth/token", {
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

document.getElementById("homeButton").addEventListener("click", function () {
  // 사용자를 메인 페이지로 리다이렉트합니다.
  window.location.href = "index.html"; // 메인 페이지의 경로를 정확하게 입력해주세요.
});
