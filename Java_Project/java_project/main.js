const ca_toogleB = document.querySelector('.menubar_categorytoogle');
const ki_toogleB = document.querySelector('.menubar_kindbartogle');
const kat = document.querySelector('.Kategorie_bar');
const kind = document.querySelector('.kind_bar');
const toggleCategory = document.getElementsByClassName("category-toggle");
const toggleKind = document.getElementsByClassName("kind-toggle");

ca_toogleB.addEventListener('click',()=> {
  toggleCategory[0].classList.toggle("show");
});

ki_toogleB.addEventListener('click',()=>{
  toggleKind[0].classList.toggle("show");
});