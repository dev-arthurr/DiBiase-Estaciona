const mockUsers = [
  {
    id: 1,
    matricula: "0101",
    nome: "João Silva",
    email: "joao.silva@ugb.edu.br",
    role: "admin",
    senha: "123456",
  },
  {
    id: 2,
    matricula: "1",
    nome: "Arthur",
    email: "joao.silva@ugb.edu.br",
    role: "admin",
    senha: "1",
  },
  {
    id: 3,
    matricula: "0202",
    nome: "Maria Santos",
    email: "maria.santos@ugb.edu.br",
    role: "colaborador",
    senha: "123456",
  },
  {
    id: 4,
    matricula: "0303",
    nome: "Pedro Costa",
    email: "pedro.costa@ugb.edu.br",
    role: "colaborador",
    senha: "123456",
  },
  {
    id: 5,
    matricula: "0404",
    nome: "Ana Lima",
    email: "ana.lima@ugb.edu.br",
    role: "colaborador",
    senha: "123456",
  },
];

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const matricula = document.getElementById("loginMatricula").value;
    const password = document.getElementById("loginSenha").value;

    const user = mockUsers.find((u) => u.matricula === matricula);

    if (user && user.senha === password) {
      localStorage.setItem("token", "mock-token-123");
      localStorage.setItem("role", user.role);
      localStorage.setItem("nome", user.nome);

      window.location.replace("../pages/dashboard.html");
    } else {
      document.getElementById("erro-login").style.display = "block";
    }
  });
};

export { mockUsers };

