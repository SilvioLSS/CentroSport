import autenticarUsuario from "./loginHandler.js";

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

function login() {
    const usuarioDigitado = document.getElementById("usuario").value;
    const senhaDigitada = document.getElementById("senha").value;

    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const resultado = autenticarUsuario(usuarioDigitado, senhaDigitada, cadastros);

    if (resultado !== true) {
        alert(resultado);
        return;
    }

    alert("Login realizado com sucesso!");
    localStorage.setItem("isLogado", "true");
    localStorage.setItem("usuarioLogado", usuarioDigitado);
    window.location.href = "pages/home.html";
}

document.getElementById("btnLogin").addEventListener("click", function (e) {
    e.preventDefault();
    login();
});
