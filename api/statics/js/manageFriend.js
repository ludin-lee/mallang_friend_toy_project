document.getElementById("addFriendBtn").addEventListener("click", function () {
  const form = document.getElementById("addFriendForm");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});

function addFriend() {
  const friendName = document.getElementById("friendName").value;
  const token = "Bearer " + localStorage.getItem("token");

  if (friendName === "") {
    alert("친구이름을 입력하세요");
    return;
  }

  fetch("https://mallang.site/api/friend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ name: friendName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        alert("친구가 추가되었습니다.");
        // 친구 리스트를 다시 불러옵니다.
        fetchFriendList();
      } else {
        if (data.message === "duplicate Error")
          alert("이미 존재하는 친구입니다.");
        else alert("친구 추가에 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error adding friend:", error);
      alert("친구 추가 중 오류가 발생했습니다.");
    });
}

function startEditFriend(friendId, originalName) {
  const friendItem = document.getElementById(`friend-${friendId}`);
  const friendNameSpan = friendItem.querySelector(".friend-name");

  // 원래 이름을 인풋창으로 대체
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = originalName;
  nameInput.className = "edit-name-input";
  friendNameSpan.replaceWith(nameInput);

  // 원래 버튼들을 숨기기
  const editButton = friendItem.querySelector(".edit-button");
  const deleteButton = friendItem.querySelector(".delete-button");
  const givePointButton = friendItem.querySelector(".give-point-button");

  editButton.style.display = "none";
  deleteButton.style.display = "none";
  givePointButton.style.display = "none";

  // 확인 버튼 추가
  const confirmButton = document.createElement("button");
  confirmButton.innerText = "확인";
  confirmButton.style.width = "45px";
  confirmButton.style.padding = "2px";
  confirmButton.style.height = "30px";
  confirmButton.style.fontSize = "12px";
  confirmButton.addEventListener("click", function () {
    confirmEditFriend(friendId, nameInput.value);
  });
  friendItem.appendChild(confirmButton);

  // 취소 버튼 추가
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "취소";
  cancelButton.style.width = "45px";
  cancelButton.style.padding = "2px";
  cancelButton.style.height = "30px";
  cancelButton.style.fontSize = "12px";
  cancelButton.addEventListener("click", function () {
    cancelEditFriend(friendId, originalName);
  });
  friendItem.appendChild(cancelButton);
}

function confirmEditFriend(friendId, newName) {
  const token = "Bearer " + localStorage.getItem("token");

  fetch(`https://mallang.site/api/friend?friendId=${friendId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ name: newName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        alert("친구 이름 수정 완료");
        fetchFriendList();
      } else {
        if (data.message === "duplicate Error") alert("친구이름 중복");
        else alert("서버 에러! 민용이한테 문의하세요");
      }
    })
    .catch((error) => {
      console.error("Error editing friend:", error);
      alert("친구 이름 수정 중 오류가 발생했습니다.");
    });
}

function fetchFriendList() {
  const token = "Bearer " + localStorage.getItem("token");
  const userName = getNameFromToken(token);
  // 친구 리스트를 불러오는 API 호출
  fetch(`https://mallang.site/api/friend/list?name=${userName}`, {
    // API endpoint가 정확한지 확인해주세요.
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result && data.data.friendList) {
        const friendListContainer = document.getElementById("friendList");
        friendListContainer.innerHTML = ""; // 기존 리스트 내용을 초기화

        data.data.friendList.forEach((friend) => {
          const friendItem = document.createElement("div");
          friendItem.className = "friend-item";
          friendItem.id = `friend-${friend.id}`;

          const friendName = document.createElement("span");
          friendName.className = "friend-name"; // 스타일 적용

          // 양수일 때 "+" 부호를 추가
          const pointSign = friend.point > 0 ? "+" : "";
          friendName.innerText = `${friend.name}  ${pointSign}${friend.point}점`; // 이름과 점수를 표시

          friendItem.appendChild(friendName);

          const givePointButton = document.createElement("button");
          givePointButton.className = "give-point-button"; // 스타일 적용
          givePointButton.innerText = "점수주기";
          givePointButton.addEventListener("click", function () {
            givePoint(friend.id); // 점수를 주는 함수를 호출합니다. 해당 함수를 아래에 구현해야 합니다.
          });

          const editButton = document.createElement("button");
          editButton.className = "edit-button";
          editButton.innerText = "수정";
          editButton.addEventListener("click", function () {
            startEditFriend(friend.id, friend.name);
          });

          const deleteButton = document.createElement("button");
          deleteButton.className = "delete-button"; // 스타일 적용
          deleteButton.innerText = "삭제";
          deleteButton.addEventListener("click", function () {
            deleteFriend(friend.id);
          });
          friendItem.appendChild(givePointButton);
          friendItem.appendChild(editButton);
          friendItem.appendChild(deleteButton);

          friendListContainer.appendChild(friendItem);
        });
      } else {
        alert("친구 리스트를 불러오는데 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error fetching friend list:", error);
      alert("친구 리스트를 불러오는 중 오류가 발생했습니다.");
    });
}

// 페이지 로드 시 친구 리스트를 불러옵니다.
window.onload = fetchFriendList;

function editFriend(friendId) {
  // 친구 정보를 수정하는 로직을 여기에 추가합니다.
  // 예: 수정 버튼을 누르면 해당 친구 이름 옆에 인풋 박스가 나타나고,
  // 인풋 박스에 새로운 이름을 입력한 후 확인 버튼을 누르면 API 호출을 통해 수정합니다.
}

function deleteFriend(friendId) {
  const token = "Bearer " + localStorage.getItem("token");

  fetch(`https://mallang.site/api/friend?friendId=${friendId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        alert("친구가 삭제되었습니다.");
        fetchFriendList(); // 친구 리스트를 다시 불러옵니다.
      } else {
        alert("친구 삭제에 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error deleting friend:", error);
      alert("친구 삭제 중 오류가 발생했습니다.");
    });
}
function getNameFromToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(decodeURIComponent(escape(atob(base64))));
    return payload.name;
  } catch (e) {
    console.error("Error decoding JWT:", e);
    return null;
  }
}

document.getElementById("logoutButton").addEventListener("click", function () {
  // 토큰을 로컬 스토리지에서 제거합니다.
  localStorage.removeItem("token");

  // 사용자를 로그인 페이지로 리다이렉트합니다.
  window.location.href = "login.html"; // 로그인 페이지의 경로를 정확하게 입력해주세요.
});

function givePoint(friendId) {
  const friendItem = document.getElementById(`friend-${friendId}`);

  // 입력 필드와 버튼이 이미 존재하는지 확인
  if (friendItem.querySelector(".point-input-container")) {
    return;
  }

  // 원래 버튼들을 숨기기
  const givePointButton = friendItem.querySelector(".give-point-button");
  const editButton = friendItem.querySelector(".edit-button");
  const deleteButton = friendItem.querySelector(".delete-button");

  givePointButton.style.display = "none";
  editButton.style.display = "none";
  deleteButton.style.display = "none";

  const pointInputContainer = document.createElement("div");
  pointInputContainer.className = "point-input-container";

  const pointInput = document.createElement("input");
  pointInput.type = "number";
  pointInput.id = "pointInput";
  pointInput.placeholder = "점수 입력";
  pointInputContainer.appendChild(pointInput);

  const reasonInput = document.createElement("input");
  reasonInput.type = "text";
  reasonInput.id = "reasonInput";
  reasonInput.placeholder = "이유 입력";
  pointInputContainer.appendChild(reasonInput);

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex"; // 가로로 나란히 배열하기 위해 flexbox 사용

  const confirmButton = document.createElement("button");
  confirmButton.innerText = "확인";
  confirmButton.addEventListener("click", function () {
    const point = parseInt(pointInput.value);
    const reason = reasonInput.value;

    if (!point || point === 0) {
      alert("유효한 점수를 입력해주세요.");
      return;
    }

    if (!reason.trim()) {
      alert("이유를 입력해주세요.");
      return;
    }

    const token = "Bearer " + localStorage.getItem("token");

    fetch(`https://mallang.site/api/point/give?friendId=${friendId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        point: point,
        reason: reason,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          alert("점수가 부여되었습니다.");
          fetchFriendList();
        } else {
          alert("점수 부여에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error giving point:", error);
        alert("점수 부여 중 오류가 발생했습니다.");
      });

    // 입력 필드와 버튼 제거
    friendItem.removeChild(pointInputContainer);

    // 원래 버튼들을 다시 보이게 함
    givePointButton.style.display = "block";
    editButton.style.display = "block";
    deleteButton.style.display = "block";
  });
  buttonContainer.appendChild(confirmButton);

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "취소";
  cancelButton.addEventListener("click", function () {
    friendItem.removeChild(pointInputContainer);

    // 원래 버튼들을 다시 보이게 함
    givePointButton.style.display = "block";
    editButton.style.display = "block";
    deleteButton.style.display = "block";
  });
  buttonContainer.appendChild(cancelButton);

  pointInputContainer.appendChild(buttonContainer);
  friendItem.appendChild(pointInputContainer);
}

function cancelEditFriend(friendId, originalName) {
  const friendItem = document.getElementById(`friend-${friendId}`);

  // 인풋창을 원래 이름으로 대체
  const nameInput = friendItem.querySelector(".edit-name-input");
  const friendNameSpan = document.createElement("span");
  friendNameSpan.className = "friend-name";
  friendNameSpan.innerText = originalName;
  nameInput.replaceWith(friendNameSpan);

  // 원래 버튼들을 다시 표시
  const editButton = friendItem.querySelector(".edit-button");
  const deleteButton = friendItem.querySelector(".delete-button");
  const givePointButton = friendItem.querySelector(".give-point-button");

  editButton.style.display = "block";
  deleteButton.style.display = "block";
  givePointButton.style.display = "block";

  // 확인 및 취소 버튼 제거
  Array.from(friendItem.querySelectorAll("button")).forEach((button) => {
    if (button.innerText === "확인" || button.innerText === "취소") {
      friendItem.removeChild(button);
    }
  });
}
