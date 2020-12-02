const BASE_URL = "http://13.209.255.193:8080/";

const apiDefault = axios.create({
  baseURL: BASE_URL,
});

const imgInput = document.getElementById("image");
const vidInput = document.getElementById("video");
const file = document.getElementById("file_ad");
const link = document.getElementById("link_ad");
const imgMedia = document.querySelector(".imgMedia");
const ytMedia = document.querySelector(".ytMedia");
const advertisementTitle = document.getElementById("advertisementTitle");
const subLink = document.getElementById("subLink");
const youtubeLink = document.getElementById("youtube-link");
const imageFile = document.getElementById("imageFile");
const advertisementCategoryType = document.getElementById(
  "advertisementCategoryType"
);
const advertisementFile = document.getElementById("ad_kind");
const submit = document.getElementById("register");
const cancel = document.getElementById("cancel");

function isWrite(mediaType) {
  if (advertisementTitle.value.trim() === "") {
    advertisementTitle.focus();
    alert("제목을 입력해주세요.");
    return false;
  }

  if (subLink.value.trim() === "") {
    subLink.focus();
    alert("참고 페이지를 입력해주세요.");
    return false;
  }

  if (mediaType === 0 && imageFile.files.length === 0) {
    // ? image
    alert("이미지 광고이면 광고 이미지 파일을 선택해주세요.");
    return false;
  }

  if (mediaType === 1 && youtubeLink.value.trim() === "") {
    // ? youtube
    alert("유튜브 광고이면 유튜브 아이디를 입력해주세요.");
    return false;
  }

  if (advertisementCategoryType.value === "category") {
    advertisementCategoryType.focus();
    alert("카테고리를 선택해주세요.");
    return false;
  }

  return true;
}

function getFormData(mediaType) {
  const fd = new FormData();
  fd.append("mediaType", mediaType);
  fd.append("advertisementTitle", advertisementTitle.value);
  fd.append("subLink", subLink.value);
  fd.append("advertisementCategoryType", advertisementCategoryType.value);
  fd.append("youtubeLink", youtubeLink.value);
  fd.append("imageFile", imageFile.files.item(0) || new File([], "empty"));

  return fd;
}

async function write() {
  const mediaType = +(
    (ytMedia.checked && ytMedia.value) ||
    (imgInput.checked && imgInput.value)
  );

  if (!isWrite(mediaType)) return;

  try {
    await apiDefault.post("/advertisement", getFormData(mediaType));

    // alert("광고를 등록했습니다.");
    // window.location.replace("/");
  } catch (err) {
    console.log("광고 등록에 실패하였습니다. 네트워크를 확인해주세요.");
  }
}

imgInput.addEventListener("click", () => {
  file.style.display = "block";
  link.style.display = "none";
});
vidInput.addEventListener("click", () => {
  file.style.display = "none";
  link.style.display = "block";
});

submit.addEventListener("click", write);

cancel.addEventListener("click", () => {
  window.location.replace("/");
});
