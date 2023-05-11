// obteniendo todos los elementos html necesarios
const btn = document.getElementById("btn-signup");
const btn2 = document.getElementById("btn-login");
const forgot = document.getElementById("forgot-password");
const padre = document.getElementById("back.card");
const hijo1 = document.getElementById("front-card");
const hijo2 = document.getElementById("front-card-new");
const hijo3 = document.getElementById("front-card-forgot");

// evento para cambiar a => (sign up card)
btn.addEventListener("click", () => {
  hijo1.style.display = "none";
  hijo2.style.display = "flex";
  hijo3.style.display = "none";
});
// evento para cambiar a => (login card)
btn2.addEventListener("click", () => {
  hijo2.style.display = "none";
  hijo1.style.display = "flex";
  hijo3.style.display = "none";
});
// evento para cambiar a => (forgot password card)
forgot.addEventListener("click", () => {
  hijo1.style.display = "none";
  hijo3.style.display = "flex";
});

setTimeout(function() {
  document.querySelector('#success-alert').style.display = 'none';
}, 1500); // Oculta la alerta después de 5 segundos
