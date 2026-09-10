const noticeList =
  document.getElementById("noticeList");


// 保存されている通知を取得
const notices = JSON.parse(
  localStorage.getItem("notices") || "[]"
);


// 通知を表示
notices.forEach(function(notice) {

  const newNotice =
    document.createElement("div");

  newNotice.className = "notice";


  // 画像がある場合
  let imageHTML = "";

  if (notice.image) {

    imageHTML = `
      <img
        src="${notice.image}"
        style="max-width:100%; border-radius:8px; margin-bottom:10px;"
      >
    `;

  }


  newNotice.innerHTML = `
    <p class="date">${notice.date}</p>

    <h3>${notice.title}</h3>

    <p>${notice.content}</p>

    ${imageHTML}
  `;


  noticeList.appendChild(newNotice);

});


// 更新ボタン
const reloadButton =
  document.getElementById("reloadButton");

reloadButton.addEventListener("click", function() {

  location.reload();

});