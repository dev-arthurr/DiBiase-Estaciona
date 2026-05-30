const mockUsers = [
  { matricula: "0101", senha: "123", role: "admin" },
  { matricula: "0202", senha: "123", role: "colaborador" },
];

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const matricula = document.getElementById("loginMatricula").value;
  const password = document.getElementById("loginSenha").value;

  const user = mockUsers.find((u) => u.matricula === matricula);

  if (user && user.senha === password) {
    localStorage.setItem("token", "mock-token-123");
    localStorage.setItem("role", user.role);

    window.location.replace("../pages/dashboard.html");
  } else {
    document.getElementById("erro-login").style.display = "block";
  }
});
