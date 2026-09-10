const title = document.getElementById("title");
const content = document.getElementById("content");
const image = document.getElementById("image");

const sendButton = document.getElementById("sendButton");
const message = document.getElementById("message");

const adminNoticeList =
  document.getElementById("adminNoticeList");


// お知らせを表示する関数
function showNotices() {

  adminNoticeList.innerHTML = "";

  let notices = JSON.parse(
    localStorage.getItem("notices") || "[]"
  );


  if (notices.length === 0) {

    adminNoticeList.innerHTML =
      "<p>お知らせはありません。</p>";

    return;
  }


  notices.forEach(function(notice, index) {

    const newNotice =
      document.createElement("div");

    newNotice.className = "notice";


    let imageHTML = "";

    if (notice.image) {

      imageHTML = `
        <img
          src="${notice.image}"
          style="max-width:100%; border-radius:8px;"
        >
      `;

    }


    newNotice.innerHTML = `
      <p class="date">${notice.date}</p>

      <h3>${notice.title}</h3>

      <p>${notice.content}</p>

      ${imageHTML}

      <button
        class="deleteButton"
        data-index="${index}"
      >
        この通知を削除
      </button>
    `;


    adminNoticeList.appendChild(newNotice);

  });


  const deleteButtons =
    document.querySelectorAll(".deleteButton");


  deleteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

      const index =
        Number(button.dataset.index);


      let notices = JSON.parse(
        localStorage.getItem("notices") || "[]"
      );


      notices.splice(index, 1);


      localStorage.setItem(
        "notices",
        JSON.stringify(notices)
      );


      showNotices();

    });

  });

}


// お知らせを送信
sendButton.addEventListener("click", function() {

  const titleText = title.value;
  const contentText = content.value;

  const selectedImage =
    image.files[0];


  if (titleText === "" || contentText === "") {

    message.textContent =
      "タイトルと内容を入力してください。";

    return;
  }


  // 画像を使わない場合
  if (!selectedImage) {

    saveNotice("");

    return;

  }


  // 画像を読み込む
  const reader = new FileReader();


  reader.onload = function(event) {

    const imageData =
      event.target.result;

    saveNotice(imageData);

  };


  reader.readAsDataURL(selectedImage);

});


// 通知を保存する関数
function saveNotice(imageData) {

  const notice = {

    title: title.value,

    content: content.value,

    date: new Date().toLocaleDateString("ja-JP"),

    image: imageData

  };


  let notices = JSON.parse(
    localStorage.getItem("notices") || "[]"
  );


  notices.unshift(notice);


  localStorage.setItem(
    "notices",
    JSON.stringify(notices)
  );


  message.textContent =
    "お知らせを送信しました！";


  title.value = "";

  content.value = "";

  image.value = "";


  showNotices();

}


// 最初にお知らせを表示
showNotices();