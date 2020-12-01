const BASE_URL = "http://13.209.255.193:8080/";
const IMAGE_BASE_URL =
  "https://s3-1-advertisement.s3.ap-northeast-2.amazonaws.com/";

const apiDefault = axios.create({
  baseURL: BASE_URL,
});

const main = {
  size: 16,
  page: 0,
  advertisements: [],
  searchedList: [],
  totalPage: 0,
  totalElement: 0,
};

const categoryToggleBar = document.querySelector(".menubar_categorytoogle");
const kindToggleBar = document.querySelector(".menubar_kindbartogle");
const toggleKind = document.getElementsByClassName("kind-toggle");
const toggleCategory = document.getElementsByClassName("category-toggle");
const zoomWrap = document.getElementById("zoomWrap");
const moreButton = document.getElementById("more-btn");
const search = document.querySelector(".search_bar > input");
const youtubeCopy = document.getElementById("youtubeCopy");

async function initAdvertisements() {
  const res = await apiDefault.get(
    `/advertisements?size=${main.size}&page=${main.page}`
  );

  const data = res.data;
  main.advertisements = [...main.advertisements, ...data.advertiseResponse];

  main.totalElement = data.totalElement;
  main.totalPage = data.totalPage;
  main.page += 1;
}

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

function getImageTemplate(ad) {
  const { advertisementTitle, imageId, subLink } = ad;
  const img = `<div class="item" onclick='recordHistory(${JSON.stringify(ad)})'>
    <div>
      <img src="${IMAGE_BASE_URL}${imageId}" class="item-img" title="${advertisementTitle}" onclick="zoomIn('image', '${imageId}', '${subLink}')" />
    </div>
  </div>`;

  return img;
}

function getYoutubeThumbnailTemplate(ad) {
  const { advertisementTitle, youtubeLink, subLink } = ad;
  const youtube = `<div class="item" onclick='recordHistory(${JSON.stringify(
    ad
  )})'>
    <div>
      <img
        src="https://img.youtube.com/vi/${youtubeLink}/0.jpg"
        alt="${advertisementTitle}"
        title="${advertisementTitle}"
        class="item-img"
        onclick="zoomIn('youtube', '${youtubeLink}', '${subLink}')"
      />
    </div>
  </div>`;

  return youtube;
}

function getYoutubeTemplate(youtubeLink) {
  const youtube = `<iframe
  height="315"
  src="https://www.youtube.com/embed/${youtubeLink}"
  class="item"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  ></iframe>`;

  return youtube;
}

function printAdvertisements() {
  const gridWrap = document.querySelector("#grid > div");

  for (
    let i = (main.page - 1) * main.size;
    i < main.size * main.page && i < main.totalElement;
    i++
  ) {
    const ad = main.advertisements[i];

    if (ad.mediaType) {
      // ? youtube
      gridWrap.insertAdjacentHTML("beforeend", getYoutubeThumbnailTemplate(ad));
    } else {
      // ? image
      gridWrap.insertAdjacentHTML("beforeend", getImageTemplate(ad));
    }
  }
}

function printSearchedAdvertisement(keyword) {
  const gridWrap = document.querySelector("#grid > div");
  const result = document.getElementById("result");
  gridWrap.textContent = "";
  result.textContent = `'${keyword}'에 대한 검색결과`;

  main.searchedList.forEach((el) => {
    const ad = {
      advertisementCategoryType: "",
      advertisementId: el.value,
      advertisementTitle: el.title,
      imageId: el.value,
      mediaType: el.mediaType,
      subLink: el.subLink,
      youtubeLink: el.value,
    };

    if (ad.mediaType) {
      // ? youtube
      gridWrap.insertAdjacentHTML("beforeend", getYoutubeThumbnailTemplate(ad));
    } else {
      // ? image
      gridWrap.insertAdjacentHTML("beforeend", getImageTemplate(ad));
    }
  });
}

async function searching(keyword) {
  const res = await apiDefault.get(`/advertisement?keyword=${keyword}`);

  main.searchedList = res.data;
}

async function initialize() {
  await initAdvertisements();

  if (main.page > main.totalPage) {
    return alert("불러올 광고가 없습니다.");
  }

  printAdvertisements();
}

function getNowForm() {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    form = `${y}-${m > 10 ? m : `0${m}`}-${d}`;

  return form;
}

function recordHistory(ad) {
  const histories = JSON.parse(localStorage.getItem("histories"));
  const form = getNowForm();
  const historyIdx = histories.findIndex((history) => history.date === form);

  if (historyIdx !== -1) {
    // ? history exist
    const idIdx = histories[historyIdx].items.findIndex(
      (item) => item.advertisementId === ad.advertisementId
    );

    if (idIdx === -1) {
      histories[historyIdx].items.push(ad);
    }
  } else {
    // ? history not exist
    const history = {
      date: form,
      items: [ad],
    };

    histories.push(history);
  }

  localStorage.setItem("histories", JSON.stringify(histories));
}

function download(e) {
  const id = e.target.dataset.id;
  const a = document.createElement("a");

  if (id === "0") return alert("다운로드에 실패헸습니다.");

  a.href = `${IMAGE_BASE_URL}${id}`;
  a.click();
}

categoryToggleBar.addEventListener("click", () => {
  toggleCategory[0].classList.toggle("show");
});

kindToggleBar.addEventListener("click", () => {
  toggleKind[0].classList.toggle("show");
});

search.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    if (e.target.value.trim() === "") {
      const gridWrap = document.querySelector("#grid > div");
      gridWrap.innerHTML = "";
      printAdvertisements();
      return;
    }
    await searching(e.target.value);
    printSearchedAdvertisement(e.target.value);
    moreButton.style.display = "none";
    return;
  }
});

youtubeCopy.addEventListener("click", () => {
  const youtubeLink = document.getElementById("youtubeLink");

  youtubeLink.select();

  document.execCommand("copy");
  alert("클립보드 복사 완료!");
});

moreButton.addEventListener("click", initialize);

window.addEventListener("load", initialize);
