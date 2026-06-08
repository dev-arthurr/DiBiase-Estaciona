import { mockMovimentacoes } from "./mockData.js";

let statusFiltroAtual = "";
let movimentacoesAtual = [];

function ativarBotao(idBotao) {
  document.querySelectorAll(".filter-buttons button").forEach((btn) => {
    btn.classList.remove("ativo");
  });
  document.getElementById(idBotao).classList.add("ativo");
}

function converterDataParaTimestamp(data, horario) {
  const [dia, mes, ano] = data.split("/").map(Number);
  const [hora, minuto] = horario.split(":").map(Number);

  return new Date(ano, mes - 1, dia, hora, minuto).getTime();
}

function ordenarPorDataEHora(veiculos) {
  return [...veiculos].sort((a, b) => {
    const timestampA = converterDataParaTimestamp(a.data, a.horario);
    const timestampB = converterDataParaTimestamp(b.data, b.horario);

    return timestampB - timestampA;
  });
}

function estaNoPeriodo(horario, periodo) {
  if (!periodo) return true;
  const [hora] = horario.split(":").map(Number);

  if (periodo === "manha") return hora >= 6 && hora < 12;
  if (periodo === "tarde") return hora >= 12 && hora < 18;
  if (periodo === "noite") return hora >= 18 || hora < 6;

  return true;
}

function formatarDataInputParaInterna(dataInput) {
  if (!dataInput) return null;
  const [ano, mes, dia] = dataInput.split("-");

  return `${dia}/${mes}/${ano}`;
}

function aplicarFiltros() {
  const dataInicial = document.getElementById("dataInicial").value;
  const dataFinal = document.getElementById("dataFinal").value;
  const periodo = document.getElementById("periodo").value;
  const placa = document.getElementById("buscaPlaca").value.toUpperCase();

  let resultado = [...mockMovimentacoes];

  if (dataInicial) {
    const dataInicialFormatada = formatarDataInputParaInterna(dataInicial);
    resultado = resultado.filter((mov) => {
      const dataMov = mov.data.split("/").map(Number);
      const dataFiltro = dataInicialFormatada.split("/").map(Number);
      const timestampMov = new Date(
        dataMov[2],
        dataMov[1] - 1,
        dataMov[0],
      ).getTime();
      const timestampFiltro = new Date(
        dataFiltro[2],
        dataFiltro[1] - 1,
        dataFiltro[0],
      ).getTime();
      return timestampMov >= timestampFiltro;
    });
  }

  if (dataFinal) {
    const dataFinalFormatada = formatarDataInputParaInterna(dataFinal);
    resultado = resultado.filter((mov) => {
      const dataMov = mov.data.split("/").map(Number);
      const dataFiltro = dataFinalFormatada.split("/").map(Number);
      const timestampMov = new Date(
        dataMov[2],
        dataMov[1] - 1,
        dataMov[0],
      ).getTime();
      const timestampFiltro = new Date(
        dataFiltro[2],
        dataFiltro[1] - 1,
        dataFiltro[0],
      ).getTime();
      return timestampMov <= timestampFiltro;
    });
  }

  if (periodo) {
    resultado = resultado.filter((mov) => estaNoPeriodo(mov.horario, periodo));
  }

  if (placa) {
    resultado = resultado.filter((mov) => mov.placa.includes(placa));
  }

  if (statusFiltroAtual === "estacionado") {
    resultado = resultado.filter((mov) => mov.status === "estacionado");
  } else if (statusFiltroAtual === "ausente") {
    resultado = resultado.filter((mov) => mov.status === "ausente");
  }

  const movimentacoesOrdenadas = ordenarPorDataEHora(resultado);
  movimentacoesAtual = movimentacoesOrdenadas;
  renderizarTabela(movimentacoesOrdenadas);
}

function renderizarTabela(movimentacoes) {
  const tbody = document.getElementById("table-controle");
  tbody.innerHTML = "";

  if (movimentacoes.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; padding: 20px;">Nenhum registro encontrado</td></tr>';
    return;
  }

  movimentacoes.forEach((mov) => {
    const tr = document.createElement("tr");
    const permanencia = mov.permanencia === null ? "--" : mov.permanencia;
    tr.innerHTML = `
        <td class="#">${mov.id}</td>
        <td class="placa">${mov.placa}</td>
        <td><span class="pill pill-${mov.tipo}">${mov.tipo.toUpperCase()}</span></td>
        <td class="proprietario">${mov.data + " " + mov.horario}</td>
        <td class="modelo">${permanencia}</td>
    `;
    tbody.appendChild(tr);
  });
}

window.todos = function () {
  ativarBotao("todos");
  statusFiltroAtual = "";
  aplicarFiltros();
};

window.estacionado = function () {
  ativarBotao("estacionado");
  statusFiltroAtual = "estacionado";
  aplicarFiltros();
};

window.ausente = function () {
  ativarBotao("ausente");
  statusFiltroAtual = "ausente";
  aplicarFiltros();
};

window.aplicarFiltros = aplicarFiltros;

function exportarParaCSV() {
  if (movimentacoesAtual.length === 0) {
    alert("Nenhum registro para exportar. Aplique filtros e tente novamente.");
    return;
  }

  const cabeçalho = ["ID", "Placa", "Tipo", "Data e Hora", "Permanência"];
  const linhas = movimentacoesAtual.map((mov) => [
    mov.id,
    mov.placa,
    mov.tipo,
    mov.data + " " + mov.horario,
    mov.permanencia || "-",
  ]);

  const conteudoCSV = [
    cabeçalho.join(","),
    ...linhas.map((l) => l.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([conteudoCSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "relatorio_movimentacoes_" + new Date().getTime() + ".csv";
  link.click();
  URL.revokeObjectURL(url);
}

window.exportarParaCSV = exportarParaCSV;

window.addEventListener("DOMContentLoaded", () => {
  todos();
  const relatorioBtn = document.getElementById("exportarCSV");
  if (relatorioBtn) {
    relatorioBtn.addEventListener("click", exportarParaCSV);
  }
});
