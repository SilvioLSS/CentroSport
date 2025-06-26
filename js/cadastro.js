import validarCampos from "./validarCampos.js";

// Cadastro inicial do admin
if (!localStorage.getItem("cadastros")) {
    const admin = {
        usuario: "admin",
        email: "admin@gmail.com",
        senha: "1234",
        telefone: "(16) 99999-1111",
        cidade: "araraquara"
    };
    localStorage.setItem("cadastros", JSON.stringify([admin]));
}

// Máscara no campo telefone
const telefoneInput = document.getElementById("telefone");
telefoneInput.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");

    if (valor.length > 0) valor = "(" + valor;
    if (valor.length > 3) valor = valor.slice(0, 3) + ") " + valor.slice(3);
    if (valor.length > 10) valor = valor.slice(0, 10) + "-" + valor.slice(10);

    this.value = valor.slice(0, 15);
});

// Bloqueia números no campo cidade
document.getElementById("cidade").addEventListener("keypress", function (e) {
    if (/\d/.test(e.key)) e.preventDefault();
});

function cadastrar() {
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const cidade = document.getElementById("cidade").value.trim();

    const resultado = validarCampos(usuario, email, senha, telefone, cidade);

    if (resultado !== true) {
        alert(resultado);
        return;
    }

    const novoCadastro = { usuario, email, senha, telefone, cidade };
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.push(novoCadastro);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    alert("Cadastro efetuado com sucesso!");
    window.location.href = "../index.html";
}

document.getElementById("btnCadastrar").addEventListener("click", function (e) {
    e.preventDefault();
    cadastrar();
});
