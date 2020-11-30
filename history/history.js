const BASE_URL = "http://13.209.255.193:8080/";
const IMAGE_BASE_URL =
  "https://s3-1-advertisement.s3.ap-northeast-2.amazonaws.com/";

const apiDefault = axios.create({
  baseURL: BASE_URL,
});

const historyListWrap = document.getElementById("historyListWrap");

const histories = JSON.parse(localStorage.getItem("histories"));

function itemTemplate(ids) {
  let template = "";

  console.log(ids.length);

  for (let i = 0; i < 3 && i < ids.length; i++) {
    const item = `<li class="item">
      <img src="${IMAGE_BASE_URL}${ids[i]}" alt="${ids[i]}" title="${ids[i]}" />
      <div class="hovered">
        <img
          src="../assets/round-play-button.svg"
          alt="play button"
          title="play button"
        />
      </div>
    </li>`;

    template += item;
  }

  return template;
}

function listTemplate(history) {
  const { date, ids } = history;

  const template = `<div class="list">
    <div class="itemLeft">
      <p class="dateWrap">
        <span class="date">${date}</span>
        <span>시청</span>
      </p>
      <ul class="itemWrap">
        ${itemTemplate(ids)}
      </ul>
    </div>
    <div class="itemRight">
      <p><span>${ids.length}</span>개 더보기</p>
    </div>
  </div>`;

  return template;
}

function initialize() {
  histories.forEach((history) => {
    historyListWrap.insertAdjacentHTML("beforeend", listTemplate(history));
  });
}

window.addEventListener("load", initialize);
