import { mockDashboard, mockMovimentacoes } from "./mockData.js";

// PREENCHE CARDS
document.getElementById("total-veiculos").textContent =
  mockDashboard.veiculosNoEstacionamento;
document.getElementById("entradas-dia").textContent =
  mockDashboard.entradasDoDia;
document.getElementById("saidas-dia").textContent = mockDashboard.saidasDoDia;
document.getElementById("vagas-disponiveis").textContent =
  `${mockDashboard.vagasDisponiveis} / ${mockDashboard.vagasTotal}`;

// PREENCHE TABELA
const tbody = document.getElementById("table-movimentacoes");

mockMovimentacoes.slice(0, 10).forEach((mov) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
        <td class="placa">${mov.placa}</td>
        <td><span class="pill pill-${mov.tipo}">${mov.tipo.toUpperCase()}</span></td>
        <td>${mov.horario}</td>
        <td><span class="pill pill-${mov.status}">${mov.status.toUpperCase()}</span></td>
    `;
  tbody.appendChild(tr);
});
