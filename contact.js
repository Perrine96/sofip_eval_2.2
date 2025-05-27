// console.log("connecté");
// Pseudo code :
// 'Au clic' sur les CHEVRONS,le FORMULAIRE PARENT 2 et le FORMULAIRE ENFANT /apparait/

const chevronParent = document.querySelector(".chevronParent");
// console.log(chevronParent, "le chevron parent");

const chevronEnfant = document.querySelector(".chevronEnfant");
// console.log(chevronEnfant, "le chevron enfant");

// console.log(chevron, "les deux chevrons");
const formParent2 = document.querySelector("#formParent2");
// console.log(formParent2, "le formulaire parent 2");
const formEnfant = document.querySelector(".formEnfant");
// console.log(formEnfant, "le formulaire enfant");

chevronParent.addEventListener("click", function () {
  // console.log("icone du formulaire parent N°2 cliqué");
  formParent2.style.display = "block";
});
