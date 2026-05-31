import { mockDashboard } from "./mockData.js";

// PREENCHE CARDS
document.getElementById("total-veiculos").textContent =
  mockDashboard.veiculosNoEstacionamento;
document.getElementById("entradas-dia").textContent =
  mockDashboard.entradasDoDia;
document.getElementById("saidas-dia").textContent = mockDashboard.saidasDoDia;
document.getElementById("vagas-disponiveis").textContent =
  `${mockDashboard.vagasDisponiveis} / ${mockDashboard.vagasTotal}`;
