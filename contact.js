// console.log("connecté");
// Pseudo code :
// 'Au clic' sur les CHEVRONS,le FORMULAIRE PARENT 2 et le FORMULAIRE ENFANT /apparait/

const btn_form_parent = document.querySelector(".btn_form_parent");
// console.log(btn_form_parent, "le chevron parent");

const btn_form_enfant = document.querySelector(".btn_form_enfant");
// console.log(btn_form_enfant, "le chevron enfant");

const formParent2 = document.querySelector(".hiddenFormP");
// console.log(formParent2, "le formulaire parent 2");

const formEnfant = document.querySelector(".hiddenFormE");
// console.log(formEnfant, "le formulaire enfant");

btn_form_parent.addEventListener("click", function (event) {
  event.preventDefault();
  formParent2.classList.toggle("hidden");
  formParent2.classList.toggle("visible");
});
btn_form_enfant.addEventListener("click", function (event) {
  event.preventDefault();
  formEnfant.classList.toggle("hidden");
  formEnfant.classList.toggle("visible");
});
