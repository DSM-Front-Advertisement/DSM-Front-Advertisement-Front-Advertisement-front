const BASE_URL = "http://13.209.255.193:8080/";
const IMAGE_BASE_URL =
  "https://s3-1-advertisement.s3.ap-northeast-2.amazonaws.com/";

const apiDefault = axios.create({
  baseURL: BASE_URL,
});
const histories = JSON.parse(localStorage.getItem("histories"));

const historyListWrap = document.getElementById("historyListWrap");
const zoomWrap = document.getElementById("zoomWrap");
const youtubeCopy = document.getElementById("youtubeCopy");

function zoomIn(type, link, subLink) {
  const imageWrap = document.getElementById("zoomImageWrap");
  const youtubeWrap = document.getElementById("zoomYoutubeWrap");

  zoomWrap.style.display = "block";

  if (type === "image") {
    const image = document.getElementById("zoomImage");
    const subLinkWrap = document.getElementById("zoomImageSubLink");
    const download = document.getElementById("download");

    imageWrap.style.display = "flex";
    youtubeWrap.style.display = "none";
    image.setAttribute("src", `${IMAGE_BASE_URL}${link}`);
    subLinkWrap.textContent = subLink;
    subLinkWrap.setAttribute("href", subLink);
    download.dataset.id = link;
  } else if (type === "youtube") {
    const youtube = document.getElementById("zoomYoutube");
    const subLinkWrap = document.getElementById("zoomYoutubeSubLink");
    const youtubeLink = document.getElementById("youtubeLink");

    youtubeWrap.style.display = "block";
    imageWrap.style.display = "none";
    youtube.setAttribute("src", `https://www.youtube.com/embed/${link}`);
    subLinkWrap.textContent = subLink;
    subLinkWrap.setAttribute("href", subLink);
    youtubeLink.value = `https://www.youtube.com/watch?v=${link}`;
  }
}

function zoomOut() {
  zoomWrap.style.display = "none";
}

function itemTemplate(items) {
  let template = "";

  for (let i = 0; i < items.length; i++) {
    const id = items[i].advertisementId;
    const ytId = items[i].youtubeLink;
    let item = "";

    if (items[i].mediaType === 1) {
      // ? youtube
      item = `<li class="item" onclick="zoomIn('youtube', '${ytId}', '${items[i].subLink}')">
      <img src="https://img.youtube.com/vi/${ytId}/0.jpg" alt="${ytId}" title="${ytId}" />
      <div class="hovered">
        <img
          src="../assets/round-play-button.svg"
          alt="play button"
          title="play button"
        />
      </div>
    </li>`;
    } else {
      // ? image
      item = `<li class="item" onclick="zoomIn('image', '${id}', '${items[i].subLink}')">
      <img src="${IMAGE_BASE_URL}${id}" alt="${id}" title="${id}" />
      <div class="hovered">
        <img
          src="../assets/round-play-button.svg"
          alt="play button"
          title="play button"
        />
      </div>
    </li>`;
    }

    template += item;
  }

  return template;
}

function listTemplate(history) {
  const { date, items } = history;

  const template = `<div class="list">
    <div class="itemLeft">
      <p class="dateWrap">
        <span class="date">${date}</span>
        <span>시청</span>
      </p>
      <ul class="itemWrap">
        ${itemTemplate(items)}
      </ul>
    </div>
  </div>`;

  return template;
}

function download(e) {
  const id = e.target.dataset.id;
  const a = document.createElement("a");

  if (id === "0") return alert("다운로드에 실패헸습니다.");

  a.href = `${IMAGE_BASE_URL}${id}`;
  a.click();
}

function initialize() {
  histories.forEach((history) => {
    historyListWrap.insertAdjacentHTML("beforeend", listTemplate(history));
  });
}

youtubeCopy.addEventListener("click", () => {
  const youtubeLink = document.getElementById("youtubeLink");

  youtubeLink.select();

  document.execCommand("copy");
  alert("클립보드 복사 완료!");
});

window.addEventListener("load", initialize);
