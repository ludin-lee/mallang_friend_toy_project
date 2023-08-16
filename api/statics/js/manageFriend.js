const menuButtons = document.querySelectorAll(".managing-container button");
const addFriendSection = document.getElementById("addFriendSection");

// 메뉴 버튼 클릭 이벤트 처리
menuButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // 모든 메뉴 버튼 숨기기
    menuButtons.forEach((btn) => {
      btn.style.display = "none";
    });

    // 해당 섹션 보이기
    if (button.id === "addFriend") {
      addFriendSection.style.display = "block";
    } else {
      // 다른 메뉴 섹션들을 구현할 수 있습니다.
    }
  });
});

// 뒤로가기 버튼 클릭 이벤트 처리
document.getElementById("backToMenu").addEventListener("click", function () {
  // 모든 메뉴 버튼 보이기
  menuButtons.forEach((button) => {
    button.style.display = "inline-block";
  });

  // 추가 섹션 숨기기
  addFriendSection.style.display = "none";
});

// 확인 버튼 클릭 이벤트 처리
document
  .getElementById("confirmAddFriend")
  .addEventListener("click", function () {
    // 입력된 친구 이름 가져오기
    const friendName = document.getElementById("friendNameInput").value;

    // 여기에서 추가 작업 수행
    // 예를 들어, 서버로 친구 이름을 전송하거나 다른 작업을 수행할 수 있습니다.

    // 인풋 창 비우기
    document.getElementById("friendNameInput").value = "";

    // 뒤로가기 버튼 클릭 (메뉴로 돌아가기)
    document.getElementById("backToMenu").click();
  });
