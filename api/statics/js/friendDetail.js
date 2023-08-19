async function fetchFriendDetails() {
  // Get friendId from the URL's query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const friendId = urlParams.get("friendId");

  if (!friendId) {
    alert("Friend ID is missing in the URL.");
    return;
  }

  try {
    const response = await fetch(
      `https://mallang.site/api/friend/info?friendId=${friendId}`
    );
    const data = await response.json();

    if (data.result) {
      const friendDetailDiv = document.getElementById("friendDetail");
      const friendInfo = data.data.friendInfo;
      friendDetailDiv.innerHTML = `
    <h3>친구 이름: ${friendInfo.name}</h3>
    <p>총 점수: ${friendInfo.point}</p>
    <ul class="no-bullet">
        ${friendInfo.pointHistories
          .map(
            (history) =>
              `<li><strong>${history.point > 0 ? "+" : ""}${
                history.point
              } 점</strong> <br id="historyReason">이유: ${
                history.reason
              }<br></li>`
          )
          .join("")}
    </ul>
`;
    } else {
      alert("Failed to fetch friend details.");
    }
  } catch (error) {
    console.error("Error fetching friend details:", error);
    alert("Failed to fetch friend details due to an error.");
  }
}
document.getElementById("backButton").addEventListener("click", function () {
  window.history.back();
});

fetchFriendDetails();
