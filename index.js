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

    imageWrap.style.display = "flex";
    youtubeWrap.style.display = "none";
    image.setAttribute("src", `${IMAGE_BASE_URL}${link}`);
    subLinkWrap.textContent = subLink;
    subLinkWrap.setAttribute("href", subLink);
  } else if (type === "youtube") {
    const youtube = document.getElementById("zoomYoutube");
    const subLinkWrap = document.getElementById("zoomYoutubeSubLink");

    youtubeWrap.style.display = "block";
    imageWrap.style.display = "none";
    youtube.setAttribute("src", `https://www.youtube.com/embed/${link}`);
    subLinkWrap.textContent = subLink;
    subLinkWrap.setAttribute("href", subLink);
  }
}

function zoomOut() {
  zoomWrap.style.display = "none";
}

function getImageTemplate({ advertisementTitle, imageId, subLink }) {
  const img = `<div class="item">
    <div>
      <img src="${IMAGE_BASE_URL}${imageId}" class="item-img" title="${advertisementTitle}" onclick="zoomIn('image', '${imageId}', '${subLink}')" />
    </div>
  </div>`;

  return img;
}

function getYoutubeThumbnailTemplate({
  advertisementTitle,
  youtubeLink,
  subLink,
}) {
  const youtube = `<div class="item">
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

function printSearchedAdvertisement() {
  const gridWrap = document.querySelector("#grid > div");
  gridWrap.innerHTML = "";

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

  console.log(res.data);
}

async function initialize() {
  await initAdvertisements();

  if (main.page > main.totalPage) {
    return alert("불러올 광고가 없습니다.");
  }

  printAdvertisements();
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
      console.log(1);
      const gridWrap = document.querySelector("#grid > div");
      gridWrap.innerHTML = "";
      printAdvertisements();

      return;
    }
    console.log(2);
    await searching(e.target.value);
    printSearchedAdvertisement();
    moreButton.style.display = "none";
    return;
  }
});

moreButton.addEventListener("click", initialize);

window.addEventListener("load", initialize);
