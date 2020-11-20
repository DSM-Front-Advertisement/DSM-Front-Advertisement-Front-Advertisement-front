const ca_toogleB = document.querySelector(".menubar_categorytoogle");
const ki_toogleB = document.querySelector(".menubar_kindbartogle");
const kat = document.querySelector(".Kategorie_bar");
const kind = document.querySelector(".kind_bar");
const toggleCategory = document.getElementsByClassName("category-toggle");
const toggleKind = document.getElementsByClassName("kind-toggle");
const imgInput = document.getElementById("image");
const vidInput = document.getElementById("video");
const file = document.getElementsByClassName("file_ad");
const link = document.getElementsByClassName("link_ad");
const zoomInWrap = document.getElementById("zoomInWrap");

ca_toogleB.addEventListener("click", () => {
  toggleCategory[0].classList.toggle("show");
});

ki_toogleB.addEventListener("click", () => {
  toggleKind[0].classList.toggle("show");
});

function SetGridItemHeight() {
  let grid = document.getElementsByClassName("grid")[0];
  let rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  let rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );

  let item = grid.getElementsByClassName("item");
  for (let i = 0; i < item.length; ++i) {
    item[i].style.gridRowEnd = `span ${Math.ceil(
      item[i].offsetHeight / (rowHeight + rowGap)
    )}`;
  }
}

function zoomIn(el) {}

window.addEventListener("load", SetGridItemHeight);
window.addEventListener("resize", SetGridItemHeight);
