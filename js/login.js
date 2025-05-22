// Cadastro automático do usuário admin, se ainda não existir
if (!localStorage.getItem("cadastros")) {
    var admin = {
        usuario: "admin",
        email: "admin@gmail.com",
        senha: "1234",
        telefone: "(16) 99999-1111",
        cidade: "araraquara"
    };

    localStorage.setItem("cadastros", JSON.stringify([admin]));
}

function login() {
    var usuarioDigitado = document.getElementById("usuario").value;
    var senhaDigitada = document.getElementById("senha").value;

    var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    var usuarioEncontrado = cadastros.find(function(cadastro) {
        return cadastro.usuario === usuarioDigitado;
    });

    if (!usuarioEncontrado) {
        alert("usuário não identificado");
        return;
    }

    if (usuarioEncontrado.senha !== senhaDigitada) {
        alert("senha inválida");
        return;
    }

    alert("Login realizado com sucesso!");
    localStorage.setItem("isLogado", "true");
    window.location.href = "pages/home.html";
}

document.getElementById("btnLogin").addEventListener("click", function(e) {
    e.preventDefault();
    login();
});
