import { mockVeiculos } from "./mockData.js";

function ativarBotao(idBotao) {
  document.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("ativo");
  });

  document.getElementById(idBotao).classList.add("ativo");
}

window.todos = function () {
  ativarBotao("todos");
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  mockVeiculos.slice(inicio, fim).forEach((mov) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="placa">${mov.placa}</td>
            <td class="proprietario">${mov.proprietario}</td>
            <td class="matricula">${mov.matricula}</td>
            <td class="modelo">${mov.modelo}</td>
            <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
        `;
    tbody.appendChild(tr);
  });
  window.proxima = function () {
    if (paginaAtual < paginatodos) {
      paginaAtual++;
      todos();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  };
  window.anterior = function () {
    if (paginaAtual > 1) {
      paginaAtual--;
      todos();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  };
  document.getElementById("exibion").innerHTML="Exibindo " + paginaAtual + "-" + paginatodos + " de " + mockVeiculos.length + " veículos";
};

const veiculosEstacionados = mockVeiculos.filter(
  (veiculo) => veiculo.status === "estacionado",
);

window.estacionado = function () {
  ativarBotao("estacionado");
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  veiculosEstacionados.slice(inicio, fim).forEach((mov) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="placa">${mov.placa}</td>
            <td class="proprietario">${mov.proprietario}</td>
            <td class="matricula">${mov.matricula}</td>
            <td class="modelo">${mov.modelo}</td>
            <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
        `;
    tbody.appendChild(tr);
  });
  window.proxima = function () {
    if (paginaAtual < paginaestacionada) {
      paginaAtual++;
      estacionado();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  };
  
  window.anterior = function () {
    if (paginaAtual > 1) {
      paginaAtual--;
      estacionado();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  };
  document.getElementById("exibion").innerHTML="Exibindo " + paginaAtual + "-" + paginaestacionada + " de " + mockVeiculos.length + " veículos";
};

const veiculosAusente = mockVeiculos.filter(
  (veiculo) => veiculo.status === "ausente",
);

window.ausente = function () {
  ativarBotao("ausente");
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  veiculosAusente.slice(inicio, fim).forEach((mov) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="placa">${mov.placa}</td>
            <td class="proprietario">${mov.proprietario}</td>
            <td class="matricula">${mov.matricula}</td>
            <td class="modelo">${mov.modelo}</td>
            <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
        `;
    tbody.appendChild(tr);
  });
  window.proxima = function () {
    if (paginaAtual < paginausente) {
      paginaAtual++;
      ausente();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  };
  window.anterior = function () {
    if (paginaAtual > 1) {
      paginaAtual--;
      ausente();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  };
  document.getElementById("exibion").innerHTML="Exibindo " + paginaAtual + "-" + paginausente + " de " + mockVeiculos.length + " veículos";
};

window.pesquisar = function () {
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  const pesquisa = document.getElementById("pesquisa").value;

  const veiculosSearch = mockVeiculos.filter(
    (veiculo) => veiculo.placa === pesquisa,
  );

  veiculosSearch.forEach((mov) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="placa">${mov.placa}</td>
            <td class="proprietario">${mov.proprietario}</td>
            <td class="matricula">${mov.matricula}</td>
            <td class="modelo">${mov.modelo}</td>
            <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
        `;
    tbody.appendChild(tr);
  });
};

let paginaAtual = 1;
const itensPorPagina = 10;
let numerodecarros = mockVeiculos.length;
let paginaestacionada = Math.ceil(veiculosEstacionados.length / itensPorPagina);
let paginausente = Math.ceil(veiculosAusente.length / itensPorPagina);
let paginatodos = Math.ceil(mockVeiculos.length / itensPorPagina);


window.filtrotodos = function () {
  paginaAtual = 1;
  todos();
  document.getElementById("pagina").textContent = paginaAtual;
};

window.filtroestacionado = function () {
  paginaAtual = 1;
  estacionado();
  document.getElementById("pagina").textContent = paginaAtual;
};

window.filtroausente = function () {
  paginaAtual = 1;
  ausente();
  document.getElementById("pagina").textContent = paginaAtual;
};