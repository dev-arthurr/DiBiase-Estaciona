const nome = localStorage.getItem("nome") || "Usuário";
const role = localStorage.getItem("role") || "Colaborador";

document.getElementById("userName").textContent = nome;
document.getElementById("UserRole").textContent =
  role === "admin" ? "Administrador" : "Colaborador";
