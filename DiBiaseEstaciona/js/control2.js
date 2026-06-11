import { mockVeiculos } from "./mockData.js";

let paginaAtual = 1;
const itensPorPagina = 10;
let listaAtual = [];

function ativarBotao(idBotao) {
  document.querySelectorAll(".buttons button").forEach((btn) => {
    btn.classList.remove("ativo");
  });

  const botao = document.getElementById(idBotao);
  if (botao) botao.classList.add("ativo");
}

function renderTabela(lista) {
  listaAtual = lista;

  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  lista.slice(inicio, fim).forEach((mov) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${mov.id}</td>
      <td class="placa">${mov.placa}</td>
      <td>${mov.proprietario}</td>
      <td>${mov.matricula}</td>
      <td>${mov.modelo}</td>
      <td>
        <span class="pill pill-${mov.status}">
          ${mov.status.toUpperCase()}
        </span>
      </td>
      <td class="acoes">
        <button class="atualizar" onclick="atualizar(${mov.id})">
          ATUALIZAR
        </button>

        <button class="excluir" onclick="excluir(${mov.id})">
          EXCLUIR
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  const totalPaginas = Math.ceil(lista.length / itensPorPagina);

  document.getElementById("pagina").textContent = paginaAtual;

  document.getElementById("exibion").textContent =
    `Exibindo ${inicio + 1}-${Math.min(fim, lista.length)} de ${lista.length} veículos`;

  window.proxima = function () {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      renderTabela(listaAtual);
    }
  };

  window.anterior = function () {
    if (paginaAtual > 1) {
      paginaAtual--;
      renderTabela(listaAtual);
    }
  };
}

window.todos = function () {
  ativarBotao("todos");

  const lista = [...mockVeiculos].sort((a, b) => b.id - a.id);

  renderTabela(lista);
};

window.estacionado = function () {
  ativarBotao("estacionado");

  const lista = mockVeiculos
    .filter((v) => v.status === "estacionado")
    .sort((a, b) => b.id - a.id);

  renderTabela(lista);
};

window.ausente = function () {
  ativarBotao("ausente");

  const lista = mockVeiculos
    .filter((v) => v.status === "ausente")
    .sort((a, b) => b.id - a.id);

  renderTabela(lista);
};

window.filtrotodos = function () {
  paginaAtual = 1;
  todos();
};

window.filtroestacionado = function () {
  paginaAtual = 1;
  estacionado();
};

window.filtroausente = function () {
  paginaAtual = 1;
  ausente();
};

window.pesquisar = function () {
  paginaAtual = 1;

  const pesquisa = document
    .getElementById("pesquisa")
    .value
    .trim()
    .toUpperCase();

  const lista = mockVeiculos.filter(
    (v) => v.placa.toUpperCase().includes(pesquisa)
  );

  renderTabela(lista);
};

function abrirPopup() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function abrirPopupedit() {
  document.getElementById("popup-editar").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function fecharPopupedit() {
  document.getElementById("popup-editar").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

window.add = function () {
  abrirPopup();
};

window.fechar = function () {
  fecharPopup();
  fecharPopupedit();
};

window.cadastrar = function () {
  const ultimoId =
    mockVeiculos.length > 0
      ? mockVeiculos[mockVeiculos.length - 1].id
      : 0;

  const novoVeiculo = {
    id: ultimoId + 1,
    placa: document.getElementById("placa").value,
    proprietario: document.getElementById("nome").value,
    matricula: document.getElementById("matricula").value,
    modelo: document.getElementById("modelo").value,
    status: "ausente",
  };

  mockVeiculos.push(novoVeiculo);

  fecharPopup();
  todos();
};

let idEditando = null;

window.atualizar = function (id) {
  idEditando = id;

  const veiculo = mockVeiculos.find((v) => v.id === id);

  document.getElementById("placa-edit").value = veiculo.placa;
  document.getElementById("nome-edit").value = veiculo.proprietario;
  document.getElementById("matricula-edit").value = veiculo.matricula;
  document.getElementById("modelo-edit").value = veiculo.modelo;

  abrirPopupedit();
};

window.editar = function () {
  const veiculo = mockVeiculos.find(
    (v) => v.id === idEditando
  );

  if (!veiculo) return;

  veiculo.placa = document.getElementById("placa-edit").value;
  veiculo.proprietario = document.getElementById("nome-edit").value;
  veiculo.matricula = document.getElementById("matricula-edit").value;
  veiculo.modelo = document.getElementById("modelo-edit").value;

  fecharPopupedit();
  todos();
};

window.excluir = function (id) {
  const indice = mockVeiculos.findIndex(
    (v) => v.id === id
  );

  if (indice !== -1) {
    mockVeiculos.splice(indice, 1);
  }

  todos();
};



window.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const sidebar = document.querySelector(".sidebar");

  if (menuIcon && sidebar) {
    menuIcon.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  todos();
});