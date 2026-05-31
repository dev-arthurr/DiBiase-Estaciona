const nome = localStorage.getItem("nome") || "Usuário";
const role = localStorage.getItem("role") || "Colaborador";

document.getElementById("userName").textContent = nome;
document.getElementById("UserRole").textContent =
  role === "admin" ? "Administrador" : "Colaborador";

// MENU LOGOUT
const footer = document.getElementById("side-footer");
const menu = document.getElementById("side-footer-menu");

footer.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// fecha ao clicar fora
document.addEventListener("click", (e) => {
  if (!footer.contains(e.target)) {
    menu.classList.remove("active");
  }
});

document.getElementById("side-footer-menu").addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.clear();
  window.location.replace("../pages/login.html");
});
