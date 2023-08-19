function redirectToLogin() {
  window.location.href = "/login.html"; // 로그인 페이지로 이동. 로그인 페이지의 경로에 따라 수정이 필요합니다.
}

function redirectToRankings() {
  const userName = document.getElementById("userName").value;
  if (userName) {
    window.location.href = `?username=${userName}`;
  } else {
    alert("주인님의 이름을 적어주세요");
  }
}

function viewFriendDetails(friendId) {
  window.location.href = `/friendDetail.html?friendId=${friendId}`; // 친구 상세 페이지로 이동. 친구 상세 페이지의 경로에 따라 수정이 필요합니다.
}

async function fetchRankings() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("username");

  if (!userName) return;

  document.getElementById("userInputDiv").style.display = "none";

  try {
    const response = await fetch(
      `http://192.168.219.105:3000/api/friend/list?name=${userName}`
    );
    const data = await response.json();

    if (data.result) {
      const rankingListDiv = document.getElementById("rankingList");
      rankingListDiv.style.display = "block";

      // 점수에 따라 내림차순으로 정렬
      const sortedFriends = data.data.friendList.sort(
        (a, b) => b.point - a.point
      );
      sortedFriends.forEach((friend, index) => {
        const friendDiv = document.createElement("div");
        // 등수를 표시 (index + 1)
        friendDiv.innerText = `${index + 1}등  ${friend.name} - ${
          friend.point
        } 점`;
        friendDiv.style.fontWeight = "bold";
        // 1등일 경우 테두리에 금색 적용
        if (index === 0) {
          friendDiv.classList.add("gold-border");
        }

        const detailsButton = document.createElement("button");
        detailsButton.innerText = "..."; // 이 부분은 원하는 텍스트나 아이콘으로 변경 가능
        detailsButton.classList.add("details-btn"); // 스타일을 적용하기 위한 클래스 추가
        detailsButton.onclick = () => viewFriendDetails(friend.id);

        friendDiv.appendChild(detailsButton);
        rankingListDiv.appendChild(friendDiv);
      });
    } else {
      alert("없는 주인님입니다. 정신차리세욧!");
      window.location.href = "index.html";
    }
  } catch (error) {
    alert(error);
    console.error("Error fetching rankings:", error);
    // alert("Failed to fetch rankings due to an error.");
  }
}

function checkEnterKey(event) {
  // 엔터 키의 keyCode는 13입니다.
  if (event.keyCode === 13) {
    redirectToRankings();
  }
}
fetchRankings();
