const BASE_URL = "http://localhost:8080/";

const ca_toggleB = document.querySelector(".menubar_categorytoogle");
const ki_toggleB = document.querySelector(".menubar_kindbartogle");
const kat = document.querySelector(".Kategorie_bar");
const kind = document.querySelector(".kind_bar");
const toggleCategory = document.getElementsByClassName("category-toggle");
const toggleKind = document.getElementsByClassName("kind-toggle");
const imgInput = document.getElementById("image");
const vidInput = document.getElementById("video");
const file = document.getElementsByClassName("file_ad");
const link = document.getElementsByClassName("link_ad");
const zoomWrap = document.getElementById("zoomWrap");
const gridWrap = document.getElementById("grid");
const imageWrap = document.getElementById("zoomImageWrap");
const youtubeWrap = document.getElementById("zoomYoutubeWrap");
let page = 0;
let totalElement = 0;
let totalPage = 0;
let advertisements = [];

const apiDefault = axios.create({
  baseURL: BASE_URL,
});

const initAdvertisements = async () => {
  const res = await apiDefault.get(`/advertisements?size=5&page=${page}`);
  console.log(res.data);

  // advertiseResponse: Array(5)
  //   0:
  //     advertisementCategoryType: "자동차"
  //     advertisementId: 1
  //     advertisementTitle: "제목 1"
  //     imageId: 1
  //     mediaType: 0
  //     subLink: "https://naver.com"
  //     youtubeLink: ""

  const data = res.data;
  advertisements = data.advertiseResponse;

  totalElement = res.data.totalElement;
  totalPage = res.data.totalPage;
  page += 1;
};

// const advertisements = Array(10)
//   .fill(0)
//   .map((_, i) => {
//     if (i % 2) {
//       // ? image
//       return {
//         advertisementId: 1,
//         advertisementTitle: `제목 ${i + 1}`,
//         advertisementCategoryType: "과일",
//         SubLink:
//           "https://www.kurly.com/shop/goods/goods_search.php?searched=Y&set=ko&sword=%EA%B3%BC%EC%9D%BC&utm_source=1055&utm_medium=2011&utm_term=%EA%B3%BC%EC%9D%BC&utm_content=pc_general&gclid=CjwKCAiA7939BRBMEiwA-hX5J_YIm56XfiemUKBEutYsGNABrdFnl4LXtZo48NbrnTbwV3kW9W8AkhoC0EAQAvD_BwE",
//         mediaType: 0,
//         imageId: `./assets/apple${(i % 3) + 1}.svg`,
//         youtubeLink: "",
//       };
//     } else {
//       // ? youtube
//       return {
//         advertisementId: 2,
//         advertisementTitle: `제목 ${i + 1}`,
//         advertisementCategoryType: "게임",
//         SubLink: "https://lol.ps/",
//         mediaType: 1,
//         imageId: "",
//         youtubeLink: "4Sr2E3Jymnc",
//       };
//     }
//   });

function zoomIn(type, link, subLink) {
  const imageWrap = zoomWrap.querySelector("#zoomImageWrap");
  const youtubeWrap = zoomWrap.querySelector("#zoomYoutubeWrap");

  zoomWrap.style.display = "block";

  if (type === "image") {
    const image = document.getElementById("zoomImage");
    const subLinkWrap = document.getElementById("zoomImageSubLink");

    imageWrap.style.display = "flex";
    youtubeWrap.style.display = "none";
    image.setAttribute("src", link);
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

function getImageTemplate(ad) {
  const { advertisementTitle, imageId, SubLink } = ad;
  const img = `<img src="${imageId}" class="item" title="${advertisementTitle}" onclick="zoomIn('image', '${imageId}', '${SubLink}')" />`;

  return img;
}

function getYoutubeThumbnailTemplate(ad) {
  const { advertisementTitle, youtubeLink, SubLink } = ad;
  const youtube = `<img
    src="https://img.youtube.com/vi/${youtubeLink}/0.jpg"
    alt="${advertisementTitle}"
    title="${advertisementTitle}"
    class="item"
    onclick="zoomIn('youtube', '${youtubeLink}', '${SubLink}')"
  />`;

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
  // get ads from the server

  for (const ad of advertisements) {
    if (ad.mediaType) {
      // ? youtube
      gridWrap.insertAdjacentHTML("beforeend", getYoutubeThumbnailTemplate(ad));
    } else {
      // ? image
      gridWrap.insertAdjacentHTML("beforeend", getImageTemplate(ad));
    }
  }
}

ca_toggleB.addEventListener("click", () => {
  toggleCategory[0].classList.toggle("show");
});

ki_toggleB.addEventListener("click", () => {
  toggleKind[0].classList.toggle("show");
});

const initialize = async () => {
  await initAdvertisements();
  printAdvertisements();
};

window.addEventListener("load", initialize);
