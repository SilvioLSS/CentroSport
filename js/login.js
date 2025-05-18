function login() {
    var emailDigitado = document.getElementById("email").value;
    var senhaDigitada = document.getElementById("senha").value;

    var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    var usuarioEncontrado = cadastros.find(function(cadastro) {
        return cadastro.email === emailDigitado && cadastro.senha === senhaDigitada;
    });

    if (usuarioEncontrado) {
        alert("Login realizado com sucesso!");
        window.location.href = "../pages/home.html";
        localStorage.setItem("isLogado", "true");
        
    } else {
        alert("Email ou senha inválidos!");
    }
}

document.getElementById("btnLogin").addEventListener("click", function(e) {
    e.preventDefault();
    login();
});
