import { mockUsers } from "./auth.js";
let paginaAtual = 1;
let itensPorPagina = 10;
const totaluser = Math.ceil(mockUsers.length / itensPorPagina)
let usuarios = [...mockUsers];
const usuariosSalvos = localStorage.getItem("usuarios");

if (usuariosSalvos) {
    usuarios = JSON.parse(usuariosSalvos);
}

function user() {
    const tbody = document.getElementById("table-user");
    tbody.innerHTML = "";
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    usuarios.slice(inicio, fim).forEach((mov) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="#">${mov.id}</td>
            <td class="matricula">${mov.matricula}</td>
            <td class="email">${mov.email}</td>
            <td class="role">${mov.role}</td>
            <td class="acoes"><button class="atualizar" onclick="atualizar(${mov.id})">ATUALIZAR</button> <button class="excluir" onclick = "excluir(${mov.id})">EXCLUIR</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function abrirPopup() {
    document.getElementById("popup").style.display = "block";
}
function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

function abrirPopupedit() {
    document.getElementById("popup-editar").style.display = "block";
}

function fecharPopupedit() {
    document.getElementById("popup-editar").style.display = "none";
}

window.create = function () {
    abrirPopup();
}
window.fechar = function () {
    fecharPopup();
    fecharPopupedit();
}

window.cadastrar = function () {
    const ultimoId = usuarios[usuarios.length - 1].id;
    const novoId = ultimoId + 1;
    const novoUser = {
        id: novoId,
        email: document.getElementById("email").value,
        matricula: document.getElementById("matricula").value,
        role: document.getElementById("role").value,
    };

    usuarios.push(novoUser);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    user();
}
user();

window.excluir = function (id) {
    const indice = usuarios.findIndex(v => v.id === id);
    usuarios.splice(indice, 1);
    user();
};

let idEditando;

window.atualizar = function (id) {
    idEditando = id;
    const userr = usuarios.find(v => v.id === id);
    document.getElementById("matricula-edit").value = userr.matricula;
    document.getElementById("email-edit").value = userr.email;
    document.getElementById("role-edit").value = userr.role;
    abrirPopupedit();
}


window.editar = function () {
    const userr = usuarios.find(v => v.id === idEditando);
    userr.matricula = document.getElementById("matricula-edit").value;
    userr.email = document.getElementById("email-edit").value;
    userr.role = document.getElementById("role-edit").value;
    user();
};
