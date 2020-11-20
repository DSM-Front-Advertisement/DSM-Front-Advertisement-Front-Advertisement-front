const ca_toogleB = document.querySelector(".menubar_categorytoogle");
const ki_toogleB = document.querySelector(".menubar_kindbartogle");
const kat = document.querySelector(".Kategorie_bar");
const kind = document.querySelector(".kind_bar");
const toggleCategory = document.getElementsByClassName("category-toggle");
const toggleKind = document.getElementsByClassName("kind-toggle");
const imgInput = document.getElementById("image");
const vidInput = document.getElementById("video");
const file = document.getElementById("file_ad");
const link = document.getElementById("link_ad");

let selectedMediaType = "image";

imgInput.addEventListener("click", () => {
  file.style.display = "block";
  link.style.display = "none";
});
vidInput.addEventListener("click", () => {
  file.style.display = "none";
  link.style.display = "block";
});

// const testRequest = async () => {
//   const res = await axios.get(
//     "https://api.themoviedb.org/4/list/1?page=1&api_key=d00eab0751f997be4f9f7a42dba9ac92&language=ko&sort_by=original_order.asc"
//   );
//   console.log(res.data);
// };

// testRequest();
