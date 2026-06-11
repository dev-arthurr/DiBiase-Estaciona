import { mockMovimentacoes, mockVeiculos } from "./mockData.js";

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

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  mockMovimentacoes.slice(inicio,fim).forEach((mov) => {
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
  window.proxima = function() {
    if (paginaAtual < paginatodas) {
      paginaAtual++;
      todos();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  }
  window.anterior = function() {
    if (paginaAtual > 1) {
      paginaAtual--;
      todos();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  }
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

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  veiculosEntradas.slice(inicio,fim).forEach((mov) => {
    const tr = document.createElement("tr");
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
  window.proxima = function() {
    if (paginaAtual < paginaestacionada) {
      paginaAtual++;
      entrada();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  }
  window.anterior = function() {
    if (paginaAtual > 1) {
      paginaAtual--;
      entrada();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  }
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
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  veiculosSaidas.slice(inicio,fim).forEach((mov) => {
    const tr = document.createElement("tr");
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
  window.proxima = function() {
    if (paginaAtual < paginausente) {
      paginaAtual++;
      saida();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  }
  window.anterior = function() {
    if (paginaAtual > 1) {
      paginaAtual--;
      saida();
      document.getElementById("pagina").textContent = paginaAtual;
    }
  }
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


let tipoSelecionado = "entrada";

window.abrirModal = function () {
  document.getElementById("modal-overlay").classList.add("aberto");
  resetarModal();
};

window.fecharModal = function () {
  document.getElementById("modal-overlay").classList.remove("aberto");
};

window.fecharModalFora = function (event) {
  if (event.target.id === "modal-overlay") {
    fecharModal();
  }
};

window.selecionarTipo = function (tipo) {
  tipoSelecionado = tipo;
  const btnEntrada = document.getElementById("btn-entrada");
  const btnSaida = document.getElementById("btn-saida");

  btnEntrada.className = "tipo-btn";
  btnSaida.className = "tipo-btn";

  if (tipo === "entrada") {
    btnEntrada.classList.add("tipo-ativo-entrada");
  } else {
    btnSaida.classList.add("tipo-ativo-saida");
  }
};

window.previewFoto = function (input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("preview-img").src = e.target.result;
      document.getElementById("preview-container").style.display = "flex";
      document.getElementById("upload-area").style.display = "none";
    };
    reader.readAsDataURL(input.files[0]);
  }
};

window.removerFoto = function () {
  document.getElementById("input-foto").value = "";
  document.getElementById("preview-img").src = "";
  document.getElementById("preview-container").style.display = "none";
  document.getElementById("upload-area").style.display = "block";
};

window.registrarMovimentacao = function () {
  const matricula = document.getElementById("input-matricula").value.trim();
  const placa = document
    .getElementById("input-placa")
    .value.trim()
    .toUpperCase();
  const foto = document.getElementById("preview-img").src;

  if (!matricula) {
    alert("Preencha a matrícula.");
    return;
  }
  if (!placa) {
    alert("Preencha a placa.");
    return;
  }

  const placaExiste = mockVeiculos.some(
    (mov) => mov.placa.toUpperCase() === placa.toUpperCase(),
  );
  if (!placaExiste) {
    alert("Placa não encontrada.");
    return;
  }

  const carroEstacionado = mockVeiculos.find((mov) => {
    return (
      mov.placa.toUpperCase() === placa.toUpperCase() &&
      mov.status === "estacionado"
    );
  });

  if (tipoSelecionado === "entrada") {
    if (carroEstacionado) {
      alert(`O veículo de placa: ${placa} já se encontra no estacionamento.`);
      return;
    }
  }

  if (tipoSelecionado !== "entrada") {
    if (!carroEstacionado) {
      alert("Esse carro não está estacionado. Não é possível registrar saída.");
      return;
    }
  }

  const agora = new Date();
  const horario = `${String(agora.getHours()).padStart(2, "0")}:${String(agora.getMinutes()).padStart(2, "0")}`;

  const novaMovimentacao = {
    id: mockMovimentacoes.length + 1,
    placa,
    tipo: tipoSelecionado,
    horario,
    permanencia: null,
    status: tipoSelecionado === "entrada" ? "estacionado" : "ausente",
    foto: foto || null,
  };

  mockMovimentacoes.push(novaMovimentacao);

  fecharModal();
  todos(); 
};

function resetarModal() {
  document.getElementById("input-matricula").value = "";
  document.getElementById("input-placa").value = "";
  removerFoto();
  selecionarTipo("entrada");
}

let paginaAtual = 1;
let itensPorPagina = 10;
let paginatodas = Math.ceil(mockMovimentacoes.length/itensPorPagina);
let paginaestacionada = Math.ceil(veiculosEntradas.length / itensPorPagina);
let paginausente = Math.ceil(veiculosSaidas.length / itensPorPagina);


