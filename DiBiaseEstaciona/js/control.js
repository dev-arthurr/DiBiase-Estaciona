import { mockVeiculos } from "./mockData.js";

function ativarBotao(idBotao) {
    document.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("ativo");
    });

    document.getElementById(idBotao).classList.add("ativo");
}

window.todos = function() {
    ativarBotao("todos");
    const tbody = document.getElementById("table-controle");
    tbody.innerHTML = "";
    mockVeiculos.slice(0, 10).forEach((mov) => {
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

}

window.estacionado = function() {
    ativarBotao("estacionado");
    const tbody = document.getElementById("table-controle");
    tbody.innerHTML = "";

    const veiculosEstacionados = mockVeiculos.filter(
        (veiculo) => veiculo.status === "estacionado"
    );

    veiculosEstacionados.forEach((mov) => {
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
}

window.ausente = function() {
    ativarBotao("ausente");
    const tbody = document.getElementById("table-controle");
    tbody.innerHTML = "";

    const veiculosAusente = mockVeiculos.filter(
        (veiculo) => veiculo.status === "ausente"
    );

    veiculosAusente.forEach((mov) => {
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
}

window.pesquisar = function() {
    const tbody = document.getElementById("table-controle");
    tbody.innerHTML = "";

    const pesquisa = document.getElementById("pesquisa").value;

    const veiculosSearch = mockVeiculos.filter(
        (veiculo) => veiculo.placa === pesquisa);

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
}