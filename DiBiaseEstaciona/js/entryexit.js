import { mockMovimentacoes } from "./mockData.js";

function ativarBotao(idBotao) {
  document.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("ativo");
  });

  document.getElementById(idBotao).classList.add("ativo");
}

document.addEventListener("DOMContentLoaded", () => {
  ativarBotao("todos");
  window.todos();
});

const veiculosTodas = mockMovimentacoes.sort((a, b) => {
  const [horaA, minA] = a.horario.split(":").map(Number);
  const [horaB, minB] = b.horario.split(":").map(Number);

  return horaB * 60 + minB - (horaA * 60 + minA);
});

window.todos = function () {
  ativarBotao("todos");
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  mockMovimentacoes.forEach((mov) => {
    const tr = document.createElement("tr");
    if (mov.permanencia === null) {
      mov.permanencia = "--";
    }

    tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="placa">${mov.placa}</td>
            <td class="proprietario">${mov.horario}</td>
            <td><span class="pill pill-${mov.tipo}">${mov.tipo.toUpperCase()}</span></td>
            <td class="modelo">${mov.permanencia}</td>
            <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
            <td>
            <a href="${mov.foto}" target="_blank">
              <img src="${mov.foto}" alt="Imagem ${mov.placa}" width="60" height="40"
                style="object-fit: cover; border-radius: 4px; cursor: pointer;"
                onerror="this.src='placeholder.png'"
              />
            </a>
            </td>
        `;
    tbody.appendChild(tr);
  });
};

const veiculosEntradas = mockMovimentacoes
  .filter((v) => v.tipo === "entrada")
  .sort((a, b) => {
    const [horaA, minA] = a.horario.split(":").map(Number);
    const [horaB, minB] = b.horario.split(":").map(Number);

    return horaB * 60 + minB - (horaA * 60 + minA);
  });

window.entrada = function () {
  ativarBotao("entrada");
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  veiculosEntradas.forEach((mov) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="placa">${mov.placa}</td>
            <td class="proprietario">${mov.horario}</td>
            <td><span class="pill pill-${mov.tipo}">${mov.tipo.toUpperCase()}</span></td>
            <td class="modelo">${mov.permanencia}</td>
            <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
        `;
    tbody.appendChild(tr);
  });
};

const veiculosSaidas = mockMovimentacoes
  .filter((v) => v.tipo === "saida")
  .sort((a, b) => {
    const [horaA, minA] = a.horario.split(":").map(Number);
    const [horaB, minB] = b.horario.split(":").map(Number);

    return horaB * 60 + minB - (horaA * 60 + minA);
  });

window.saida = function () {
  ativarBotao("saida");
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  veiculosSaidas.forEach((mov) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="placa">${mov.placa}</td>
            <td class="proprietario">${mov.horario}</td>
            <td><span class="pill pill-${mov.tipo}">${mov.tipo.toUpperCase()}</span></td>
            <td class="modelo">${mov.permanencia}</td>
            <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
        `;
    tbody.appendChild(tr);
  });
};

window.pesquisar = function () {
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  const pesquisa = document.getElementById("pesquisa").value;

  const veiculoSearch = mockMovimentacoes.filter((v) => v.placa === pesquisa);

  veiculoSearch.forEach((mov) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="placa">${mov.placa}</td>
            <td class="proprietario">${mov.horario}</td>
            <td><span class="pill pill-${mov.tipo}">${mov.tipo.toUpperCase()}</span></td>
            <td class="modelo">${mov.permanencia}</td>
            <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
        `;
    tbody.appendChild(tr);
  });
};
